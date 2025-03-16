const Hero: React.FC = () => {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('images/background.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#7311f6] opacity-25 z-2"></div>

      <div className="items-center justify-center relative z-10 text-center">
        <h1 className="font-roboto-slab text-6xl font-bold text-white">
          Golla Raghavendra Yadav
        </h1>
        <hr className="my-4 border-t-1 border-white opacity-50 mx-auto" />
        <p className="text-2xl text-white mt-4">
          Web developer | Designer | Author | Illustrator
        </p>
      </div>
    </div>
  );
};

export default Hero;
