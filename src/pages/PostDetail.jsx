import React, { useEffect, useState } from 'react';
import { getByPostId, removePost, updatePost } from '../api/post';
import { useParams } from 'react-router-dom';
import Loding from '../components/Loding';
import Button from '../components/ui/Button';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getByPostId(postId);
      setPost(data);
      setIsLoading(false);
    }

    fetchData();
  }, [postId]);

  const onClickUpdateBtn = async () => {
    const inputTitle = prompt('변경 할 제목 : ');
    const inputContent = prompt('변경 할 글 내용 : ');
    let newProfile = {};
    if (inputTitle && inputContent) {
      // 입력된 값이 있는 경우 처리
      try {
        newProfile.title = inputTitle;
        newProfile.content = inputContent;
        console.log(newProfile);

        await updatePost(newProfile, postId);

        alert('수정완료');
        window.location.reload();
      } catch (error) {
        alert('실패');
      }
    } else {
      // 입력된 값이 없는 경우 처리
      console.log('No user input.');
    }
  };
  const onClickDeleteBtn = () => {
    removePost(postId);
  };

  if (isLoading) {
    return <Loding />;
  } else {
    return (
      <section className="flex flex-col p-4 w-full">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mt-6">{post.title}</h1>
            <div className="flex gap-4 h-fit mt-4">
              <Button text={'수정'} onClick={onClickUpdateBtn} />
              <Button text={'삭제'} onClick={onClickDeleteBtn} />
            </div>
          </div>
          <div className="flex items-center mt-4 justify-between">
            <p className="text-lg font-bold px-2 my-4 max-w-fit text-slate-800">
              {post.User.nickname}
            </p>
            <p className="font-bold ml-2">{post.createdAt.substring(0, 10)}</p>
          </div>
          <div className="w-60 border-2 border-gray-500 mt-4 mb-8 self-center" />
          <p className="text-xl p-4 font-semibold">{post.content}</p>
          {/* <MarkdownViewer content={post.content} />
            <Comment id={post.id} /> */}
        </div>
      </section>
    );
  }
}
