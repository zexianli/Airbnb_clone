export default function LogoWithoutText() {
  return (
    <div className="z-10 absolute top-0 ml-10 mt-8" draggable="false">
      <a href="/" className="w-full h-full inline-block">
        <img src="/airbnb-notext.svg" className="h-9 w-9" draggable="false" />
      </a>
    </div>
  );
}
