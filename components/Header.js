export default function Header() {
  return (
    <div className={"p-4 border-b fixed w-full z-50 bg-white shadow-lg"}>
      <div className={"max-w-5xl mx-auto text-left"}>
        <h1
          className={
            " font-serif text-gray-500 text-xl md:text-5xl font-bold w-max mx-auto"
          }
        >
          Book Recommendation System
        </h1>
        <p className={"text-gray-500 text-xs w-max mx-auto md:text-base mt-1"}>
          Powered by Gemini AI - Your reading companion
        </p>
      </div>
    </div>
  );
}
