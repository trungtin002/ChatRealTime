import GenderCheckbox from "./GenderCheckbox";

const Signup = () => {
  return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
        bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">SignUp
                <span className="text-blue-500"> Chap App</span>
            </h1>

            <form>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">FullName</span>
                    </label>
                    <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10" />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">UserName</span>
                    </label>
                    <input type="text" placeholder="johndoe" className="w-full input input-bordered h-10" />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
                </div>
                <div>
                    <GenderCheckbox/>
                </div>
                <a href="#" className="text-sm hover:underline hover:text-green-600 mt-2 inline-block">Already have an account ?</a>
                <div className="label content-center justify-center ">
                    <button type="submit" className="w-full btn btn-error btn-sm mt-2 ">SignUp</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
