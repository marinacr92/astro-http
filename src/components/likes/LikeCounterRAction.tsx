import '@styles/likeCounter.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';

interface Props {
  postId: string;
}

//* Así se harían las llamadas a los endopint con ServerActions

export const LikeCounterRAction: React.FC<Props> = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [likeClicks, setLikeClicks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Función debounced para actualizar likes en el servidor
  const updateLikes = useCallback(
    debounce(async (increment: number) => {
      if (increment === 0) return;
      await actions.updateLikes({ postId, increment });
      setLikeClicks(0);
    }, 500),
    [postId]
  );

  // Cada vez que likeCount cambie, llamamos a la función debounced
  useEffect(() => {
    updateLikes(likeClicks);
  }, [likeCount, likeClicks, updateLikes]);

  // useEffect(() => {
  //   if (likeClicks > 0) {
  //     saveLikes();
  //   }
  // }, [likeClicks, saveLikes]);

  const likePost = async () => {
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

  const getCurrentLikes = async () => {
    const { data, error } = await actions.getPostLikes(postId);
    if (error) {
      alert(error);
      return;
    }
    setLikeCount(data.likes);
    setIsLoading(false);
  };

  useEffect(() => {
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
