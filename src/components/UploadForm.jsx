/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { toast } from 'react-toastify'

export default function UploadForm({ isOpen, setIsOpen }) {  
  const inputImageRef = useRef()
  const [prevfile, setPrevfile] = useState(null)
  
  const [loading, setLoading] = useState(false)
  function closeModal() {
    inputImageRef.current.value = null
    setIsOpen(false)
    setPrevfile(null)
  }
  
  const handledFile = (e) => {
    e.preventDefault()

    const form = e.target
    const file = e.target.file.files[0]    
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (!validTypes.includes(file.type)) {
      toast.error('tipo de archivo no valido')
      form.reset()
      return
    }

    setLoading(true)
    const formdata = new FormData();
    formdata.append("formData", file);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload"`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setLoading(false)
        toast.success('Archivo enviado')
        form.reset()
        closeModal()
      })
      .catch(error => {
        console.log('error', error)
        toast.error('...ups!, hubo un error')
      });

  }

    
  const prevImage = (e) => {
    e.preventDefault()

    const currenFile = inputImageRef.current.files[0]    
    const reader = new FileReader()
    reader.addEventListener('load', () => {                        
      setPrevfile(reader.result)
    })

    reader.readAsDataURL(currenFile)
    // asi se ejecuta el fileReader una vez que se termina de leer el archivo

  }

  return (
    <>      
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Subir archivo
                  </Dialog.Title>
                  <form className='flex flex-col gap-3' onSubmit={handledFile}>
                    <input 
                      type="file" 
                      name="file" 
                      id="file" 
                      className="mt-4" 
                      onChange={prevImage} 
                      ref={inputImageRef}
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"                      
                    >
                      Upload file
                    </button>
                  </form>
                  { loading ? <span className="loader"></span> : null }
                  <picture>
                    { prevfile !== null 
                      ?  <img src={prevfile} alt="imagen previa del usuario" />
                      : null
                      }
                  </picture>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
