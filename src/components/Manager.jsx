import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useEffect } from 'react'
const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }

  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = 'text'
    if (ref.current.src.includes('icons/eyecross.png')) {
      ref.current.src = 'icons/eye.png'
      passwordRef.current.type = 'text'
    }
    else {
      ref.current.src = 'icons/eyecross.png'
      passwordRef.current.type = 'password'
    }


  }
  const savePassword = () => {
    if(form.site.length>3 && form.username.length && form.password.length){
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
    setform({ site: "", username: "", password: "" })
    toast('Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }
  }
  
  const deletePassword = (id) => {
    let c=confirm("Do you really want to delete this!")
    if(c){
    const updatedPasswords = passwordArray.filter(password => password.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast('Password deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  }

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(password => password.id === id);
    if (passwordToEdit) {
      setform({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password
      });
      const updatedPasswords = passwordArray.filter(password => password.id !== id);
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />


      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <div className="p-2 md:p-0 md:mycontainer min-h-[81.5vh] ">
        <h1 className='text-4xl font-bold text-center'><span className='text-green-500'>&lt;
        </span>
          Pass
          <span className='text-green-500'>OP/&gt;</span></h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
        <div className=' flex flex-col p-4 text-black gap-8 items-center'>
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 w-fit px-8 py-2 rounded-full border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10 ">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className=' py-2 border border-white text-center '>
                    <div className='flex items-center justify-center'>
                      <a href={item.site} target='_blank'> {item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => copyText(item.site)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className=' py-2 border border-white text-center '>
                    <div className='flex items-center justify-center'>
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => copyText(item.username)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className=' py-2 border border-white text-center '>
                    <div className='flex items-center justify-center'>
                      <span>{item.password}</span>
                      <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => copyText(item.password)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='justify-center  py-2 border border-white text-center '>
                    <span className='cursor-pointer mx-1'onClick={()=>{editPassword(item.id)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                      <lord-icon
                         src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}

            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager

