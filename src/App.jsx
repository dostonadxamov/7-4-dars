import { useDispatch, useSelector } from "react-redux";
import { add, remove, toggle } from "./app/toDoList/toDoListSlice";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import Add from "../public/deletesound2.mp3";
import Delete from "../public/deleteOriginal.mp3";

export default function App() {
  const todo = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("all");
  const audioRef = useRef(null);
  const deleteRef = useRef(null);

  const filteredTodos = todo.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // all
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const formData = new FormData(e.target);
    const name = formData.get("title");
    dispatch(
      add({
        id: Math.random(),
        name,
        completed: false,
      })
    );
    e.target.reset();
    setTitle("");
    audioRef.current.play();
    toast.success("Added successfully");
  }
  function handleDelete(id) {
    dispatch(remove(id));
    deleteRef.current.play();
    toast.success("Deleted successfully");
  }
  function handleClearCompleted() {
    const completedTodos = todo.filter((t) => t.completed);
    if (completedTodos.length > 0) {
      completedTodos.forEach((t) => dispatch(remove(t.id)));
      toast.success("Cleared completed tasks");
    } else {
      toast.error("No completed tasks yet");
    }
  }
  return (
    <div className="flex flex-col min-h-screen" data-theme={theme}>
      <header
        data-theme={theme}
        className="bg-no-repeat bg-cover h-[200px] sm:h-[250px] md:h-[300px]
      bg-[url('/images/bg-desktop-light.jpg')]
      data-[theme=dark]:bg-[url('/images/bg-desktop-dark.jpg')]"
      >
        <nav>
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[450px] pt-[40px] sm:pt-[60px] md:pt-[70px] pb-[20px] flex items-center justify-between relative">
            <h1 className="font-bold text-[28px] sm:text-[34px] md:text-[40px] tracking-[8px] sm:tracking-[10px] md:tracking-[15px] text-amber-50">
              TODO
            </h1>

          </div>
        </nav>

        {/* Input */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[450px]">
          <form onSubmit={handleSubmit}>
            <label
              data-theme={theme}
              className="input validator w-full max-w-[540px] data-[theme=dark]:bg-[#25273D] px-[16px] sm:px-[24px] gap-[16px] sm:gap-[20px]"
            >

              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                placeholder="Create a new todo…"
                className="flex-1 py-3 sm:py-4 text-sm sm:text-base"
              />
            </label>
          </form>
        </div>
      </header>
      {/* Main */}
      <main
        data-theme={theme}
        className="grow relative w-full data-[theme=dark]:bg-black"
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[450px] -top-[30px] sm:-top-[50px] absolute left-1/2 -translate-x-1/2">
          {filteredTodos.map((todolist) => {
            return (
              <div
                data-theme={theme}
                key={todolist.id}
                className="flex items-center justify-between py-[16px] sm:py-[20px] px-[16px] sm:px-[24px] w-full max-w-[540px]
              border-b border-gray-400
              bg-white text-black
              data-[theme=dark]:bg-[#25273D] data-[theme=dark]:text-white group cursor-pointer"
              >
                <div className="flex items-center gap-[16px] sm:gap-[24px]">
                  <label className="relative cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={todolist.completed || false}
                      onChange={() => dispatch(toggle(todolist.id))}
                      className="peer appearance-none w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-400"
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center text-white text-[12px] sm:text-[14px] font-bold
                    rounded-full bg-[linear-gradient(135deg,#55ddff_0%,#c058f3_100%)]
                    opacity-0 peer-checked:opacity-100"
                    >
                      <i className="fas fa-check text-[8px] sm:text-[10px]"></i>
                    </span>
                  </label>
                  <p
                    className={`text-[16px] sm:text-[18px] font-normal transition-all duration-300 ${
                      todolist.completed
                        ? "opacity-50 line-through"
                        : "opacity-100 no-underline"
                    }`}
                  >
                    {todolist.name}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(todolist.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <img src="/images/icon-cross.svg" alt="Delete" />
                </button>
              </div>
            );
          })}
          <div
            data-theme={theme}
            className="w-full max-w-[540px] py-[16px] sm:py-[20px] px-[16px] sm:px-[24px] bg-white border-b border-gray-400 data-[theme=dark]:bg-[#25273D] data-[theme=dark]:text-white flex items-center justify-between rounded-b-[5px] rounded-t-[5px]"
          >
            <p className="text-[#9495A5] text-xs sm:text-sm">
              {todo.length} items left
            </p>
            <div className="flex items-center gap-[12px] sm:gap-[19px]">
              <p
                onClick={() => setFilter("all")}
                className={`text-xs sm:text-sm font-bold cursor-pointer ${
                  filter === "all"
                    ? "text-[#3A7CFD]"
                    : "text-[#9495A5] hover:text-[#3A7CFD]"
                }`}
              >
                All
              </p>
              <p
                onClick={() => setFilter("active")}
                className={`text-xs sm:text-sm font-bold cursor-pointer ${
                  filter === "active"
                    ? "text-[#3A7CFD]"
                    : "text-[#9495A5] hover:text-[#3A7CFD]"
                }`}
              >
                Active
              </p>
              <p
                onClick={() => setFilter("completed")}
                className={`text-xs sm:text-sm font-bold cursor-pointer ${
                  filter === "completed"
                    ? "text-[#3A7CFD]"
                    : "text-[#9495A5] hover:text-[#3A7CFD]"
                }`}
              >
                Completed
              </p>
            </div>
            <p
              onClick={handleClearCompleted}
              className="text-[#9495A5] text-xs sm:text-sm hover:text-[#3A7CFD] hover:cursor-pointer"
            >
              Clear Completed
            </p>
          </div>
        </div>
      </main>
      <audio ref={audioRef} src={Add} />
      <audio ref={deleteRef} src={Delete} />

      <Toaster position="top-right" />
    </div>
  );
}
