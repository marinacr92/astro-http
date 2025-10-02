import '@styles/likeCounter.css';
import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

interface Props {
  postId: string;
}

export const LikeCounterR: React.FC<Props> = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [likeClicks, setLikeClicks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const saveLikes = useCallback(
    debounce(async (likes: number) => {
      await fetch(`/api/posts/likes/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes }),
      });
      setLikeClicks(0);
    }, 500),
    [postId]
  );

  useEffect(() => {
    if (likeClicks > 0) {
      saveLikes(likeClicks);
    }
  }, [likeClicks, saveLikes]);

  const likePost = () => {
    setLikeCount((prev) => prev + 1);
    setLikeClicks((prev) => prev + 1);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  };

  useEffect(() => {
    const getCurrentLikes = async () => {
      try {
        const resp = await fetch(`/api/posts/likes/${postId}`);
        if (!resp.ok) return;

        const data = await resp.json();
        setLikeCount(data.likes);
      } catch (err) {
        console.error('Error fetching likes', err);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentLikes();
  }, [postId]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : likeCount === 0 ? (
        <button onClick={likePost}>Like this post</button>
      ) : (
        <>
          <button onClick={likePost}>
            Likes <span>{likeCount}</span>
          </button>
        </>
      )}
    </>
  );
};
