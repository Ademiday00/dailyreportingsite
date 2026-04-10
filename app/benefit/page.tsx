  import Image from "next/image"

  export default function Benefit (){

return(
    <div className="flex">
        <div className="rounded-lg border border-white/10 px-3 py-3  drop-shadow-lg text-black mt-15 font-serif backdrop-blur-none rounded-lg  w-200  ml-3 bg-blue-50">
            <h1 className="text-3xl font-bold ml-4 mb-4">How it Works</h1>
            <div className="ml-4 mb-3">
                <div className="flex">
               <div className="mt-1.5 mr-2 size-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div> 
            <p>Secure Login</p>
            </div>
            <p>Technicians and authorized staff log in securely to the VIP Lift platform using their assigned credentials.</p>
        </div>
        <div className="ml-4 mb-3">
                <div className="flex">
               <div className="mt-1.5 mr-2  size-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div> 
            <p>Daily Report Submission</p>
            </div>
            <p>Technicians create and submit daily lift work reports by entering task details, inspection notes, and maintenance activiti</p>
        </div>

        <div className="ml-4 mb-3">
                <div className="flex">
               <div className="mt-1.5 mr-2  size-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div> 
            <p>Upload Media Evidence</p>
            </div>
            <p>Photos and videos are attached to each report to provide clear evidence of completed work and site conditions.</p>
        </div>

        <div className="ml-4 mb-3">
                <div className="flex">
               <div className="mt-1.5 mr-2  size-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div> 
            <p>Automatic File Organization</p>
            </div>
            <p>All submitted reports and media are automatically stored and organized in a predefined folder structure within the company's Dropbox.</p>
        </div>
        <div className="ml-4 mb-3">
                <div className="flex">
               <div className="mt-1.5 mr-2  size-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div> 
            <p>Real-Time Access</p>
            </div>
            <p>Supervisors and administrators can view reports instantly, monitor work progress, and access service records anytime.</p>
        </div>

        <div className="ml-4 mb-3">
                <div className="flex">
               <div className="mt-1.5 mr-2  size-3 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div> 
            <p>Review & Record Keeping</p>
            </div>
            <p>Reports are reviewed, approved if required, and stored as part of a secure, searchable service history.</p>
        </div>
        </div>
        <div className="text-black font-serif rounded-lg border border-white/10 px-3 py-3  drop-shadow-lg text-black mt-15 font-serif backdrop-blur-none rounded-lg  w-200  ml-3 bg-blue-50">
            <h1>Key Benefits</h1>
            <p>Saves time</p>
            <p>Eliminates manual file sorting</p>
            <p>Organized records</p>
            <p>Secure & reliable</p>
            <p>Easy access to reports</p>

        </div>
        <div>
            <Image
              src="/Firstimg.jpg"
              alt="Logo"
              width={70}
              height={50}
              className="mb-1"
            />  
            <Image
              src="/scendimg.jpg"
              alt="Logo"
              width={70}
              height={50}
              className="mb-1"
            />        
        </div>
    </div>
)
  }