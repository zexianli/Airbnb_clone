import { useRouter } from 'next/dist/client/router';
import { useRef, useState } from 'react';
import LogoWithoutText from '../../components/LogoWithoutText';

export default function intro() {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const router = useRouter();

  const handlePlayVideo = () => {
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  const handlePauseVideo = () => {
    videoRef.current.pause();
    setIsVideoPlaying(false);
  };

  return (
    <>
      {/* Logo */}
      <LogoWithoutText />

      <main className="flex flex-row">
        {/* Left side */}
        <div className="relative w-6/12">
          <video
            src="https://a0.muscache.com/v/cc/32/cc3253b3-96e5-5cf2-ba53-98bd5f2f0111/cc3253b396e55cf2ba5398bd5f2f0111_4000k_1.mp4"
            autoPlay
            ref={videoRef}
            className="w-full h-screen object-cover"
            onEnded={() => {
              console.log('Video ended');
              handlePauseVideo();
            }}
          />

          {/* Gradient */}
          <div className="absolute block bottom-0 w-full h-72 bg-gradient-to-t from-black opacity-50"></div>

          {/* Play/Pause button */}
          <button
            type="button"
            className="z-10 absolute bottom-0 ml-10 mb-8 cursor-pointer bg-black rounded-full p-3 bg-opacity-50 hover:bg-opacity-25"
            onClick={() => {
              console.log('Button');
              isVideoPlaying ? handlePauseVideo() : handlePlayVideo();
            }}
          >
            {isVideoPlaying ? (
              <img src="/pause-button.svg" className="block h-4 w-4" />
            ) : (
              <img src="/play-button.svg" className="block h-4 w-4" />
            )}
          </button>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-between w-6/12 h-screen bg-black items-center">
          <div className="flex flex-row-reverse max-w-5xl w-full">
            <button
              onClick={() => router.push('/')}
              className="mt-8 mr-12 p-2 px-4 rounded-full text-white text-xs font-semibold bg-[#222222]"
            >
              Exit
            </button>
          </div>
          <div className="my-auto text-center text-white mx-24 text-5xl font-semibold">
            Become a Host in 10 easy steps
            <p className="text-white font-normal text-lg mt-7 w-full">
              Join us. We'll help you every step of the way.
            </p>
          </div>
          <div className="flex flex-row-reverse max-w-5xl w-full border-t-2 border-[#222222]">
            <button
              className=" text-white p-6 py-3 mr-12 my-4 rounded-lg bg-[#dd115c] font-bold"
              onClick={() => router.push('/become-a-host/listing')}
            >
              Let's go!
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
