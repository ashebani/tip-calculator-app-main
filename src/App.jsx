import { useState } from "react";
import dollarIcon from "./images/icon-dollar.svg";
import personIcon from "./images/icon-person.svg";
import { useForm } from "react-hook-form";

function App() {
  const [tips, setTips] = useState([5, 10, 15, 25, 50]);
  const [tip, setTip] = useState(5);
  const [formData, setFormData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
  };

  const calculateTip = (formData) => {
    return (
      Math.round((((formData.amount / formData.people) * tip) / 100) * 100) /
      100
    );
  };

  const calculateTotal = (formData) => {
    return calculateTip(formData) + formData.amount / formData.people;
  };

  return (
    <div className="bg-lightGrayishCyan grid md:gap-12">
      <div>
        <p className="text-center text-2xl text-darkGrayishCyan uppercase tracking-[10px] py-7">
          Spli
          <br />
          tter
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <main className="bg-white rounded-2xl p-6 grid gap-6 max-w-4xl m-auto md:grid-cols-2 ">
          {/* Top / Left Section */}
          <section className="grid gap-4 md:gap-8 ">
            {/* Bill */}
            <div>
              <div className="flex justify-between">
                <p className="text-darkGrayishCyan mb-4">Bill</p>
                <p className="text-red-500 mb-4">{errors.amount?.message}</p>
              </div>
              <div className="relative">
                <img src={dollarIcon} alt="dollar" />

                <input
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    min: {
                      value: 1,
                      message: "Bill Cannot be 0",
                    },
                  })}
                  className={`inputStyle ${
                    errors.amount?.message
                      ? "focus:border-2 focus:border-red-500"
                      : ""
                  }`}
                  placeholder={"$0"}
                  type="number"
                  step="any"
                />
              </div>
            </div>
            {/* Selected Tip */}
            <div>
              <p className="text-darkGrayishCyan mb-4">Selected Tip %</p>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                {tips.map((number, index) => {
                  return (
                    <button
                      onClick={() => {
                        setTip(number);
                      }}
                      className={` p-2 rounded-md text-xl hover:bg-lightGrayishCyan hover:text-veryDarkCyan ${
                        tip === number
                          ? `bg-green-300 text-veryDarkCyan`
                          : "bg-veryDarkCyan text-white"
                      } `}
                      key={index}
                      type="button"
                    >
                      {number}%
                    </button>
                  );
                })}
                <input
                  onDoubleClick={(e) => {
                    const newArray = [...tips];
                    if (tips.includes(Number(e.target.value))) return;
                    else {
                      newArray.push(Number(e.target.value));
                      setTip(Number(e.target.value));
                      setTips([...newArray]);
                    }
                  }}
                  type="text"
                  placeholder="Custom"
                  max={100}
                  min={1}
                  className=" relative after:absolute after:top-10 after:w-4 after:h-10 after:bg-gray-700 bg-veryLightGrayishCyan rounded-md  text-2xl text-veryDarkCyan text-center"
                />
              </div>
            </div>
            {/* Number of People */}
            <div>
              <div className="flex justify-between">
                <p className="text-darkGrayishCyan mb-4">Number of People</p>
                <p className="text-red-500 mb-4">{errors.people?.message}</p>
              </div>
              <div className="relative">
                <img src={personIcon} alt="person" />
                <input
                  onSubmit={handleSubmit(onSubmit)}
                  {...register("people", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    min: {
                      value: 1,
                      message: "Number of people cannot be 0",
                    },
                  })}
                  className={`inputStyle ${
                    errors.people?.message
                      ? "focus:border-2 focus:border-red-500"
                      : ""
                  }`}
                  placeholder={"0"}
                  type="number"
                />
              </div>
            </div>
            <button className=" hidden"></button>
          </section>
          {/* Bottom / Right Section */}
          <section className="px-6 pb-6 pt-8  bg-veryDarkCyan rounded-2xl grid md:items-start gap-7">
            <div className=" flex justify-between items-center">
              <p className="text-white ">
                Tip Amount
                <span className=" flex text-grayishCyan text-sm">/ person</span>
              </p>
              <p className="text-strongCyan text-3xl md:text-5xl">
                {formData ? calculateTip(formData) : "$0.00"}
              </p>
            </div>
            <div className=" flex justify-between items-center">
              <p className="text-white ">
                Total
                <span className=" flex text-grayishCyan text-sm">/ person</span>
              </p>
              <p className="text-strongCyan text-3xl md:text-5xl">
                {formData ? calculateTotal(formData) : "$0.00"}
              </p>
            </div>
            <button
              type="reset"
              onClick={() => setFormData()}
              className="bg-strongCyan py-3 md:h-14 md:self-end rounded-md text-lg uppercase text-veryDarkCyan"
            >
              Reset
            </button>
          </section>
        </main>
      </form>
    </div>
  );
}

export default App;
