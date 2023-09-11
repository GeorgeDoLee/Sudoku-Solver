const Buttons = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <button className="p-2 bg-zinc-200 text-lg text-slate-800 rounded-md">
        Clear
      </button>
      <button className="p-2 bg-zinc-200 text-lg text-slate-800 rounded-md">
        Generate Random
      </button>
      <button className="p-2 bg-zinc-200 text-lg text-slate-800 rounded-md">
        Solve
      </button>
    </div>
  );
};

export default Buttons;
