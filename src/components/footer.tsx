export default function Footer() {
  return (
    <div className={"3xl:w-8/12 w-10/12 flex flex-col pt-28 mb-12 mx-auto gap-8"}>
      <div className={"flex flex-row"}>
        <div className={"flex-1/2 flex flex-col justify-between"}>
          <h1>lets's make something amazing together.</h1>
          <h1>Start by <span>saying hi</span></h1>
        </div>
        <div className={"flex-1/2"}>
          <p>Information</p>
          <p>abc</p>
          <p>abc</p>
          <p>abc</p>
          <p>abc</p>
        </div>
      </div>
      <hr className={"border-gray-300"}/>
      <div>
        <div className={"flex flex-row justify-between items-center"}>
          <div>
            <img src="/android-chrome-192x192.png" alt="nico logo" width={40} height={40}/>
          </div>
        </div>
      </div>
    </div>
  )
}