 import React from 'react'
 import Logo from './logo.jsx'
 import { Container } from '@mui/material'
 import { Mail } from '@mui/icons-material'


 const footerLists = [{
         title: 'Need Help?',
         links: [{
                 txt: 'Chat With Us',
                 link: '#'
             },
             {
                 txt: 'Help',
                 link: '#'
             },
             {
                 txt: 'Contact Us',
                 link: '#'
             },
         ]
     },
     {
         title: 'About trovemart',
         links: [{
                 txt: 'About us',
                 link: '#'
             },
             {
                 txt: 'Terms and Conditions',
                 link: '#'
             },
             {
                 txt: ' Privacy Notice',
                 link: '#'
             },
             {
                 txt: ' Privacy Notice',
                 link: '#'
             },
             {
                 txt: ' Flash Sales',
                 link: '#'
             },
         ]
     },
     {
         title: 'Useful links',
         links: [
            {
                 txt: 'Service Center',
                 link: '#'
             },
             {
                 txt: 'How to shop on trovemart',
                 link: '#'
             },
             {
                 txt: ' Return Policy',
                 link: '#'
             },
             {
                 txt: '  Dispute Resolution Policy',
                 link: '#'
             },
         ]
     },
 ]
 const Footer = () => {
     return (
         <footer className=''>
          <div className='bg-gray-800 '>
            <Container>
                 <div className='flex justify-between flex-col md:flex-row md:items-center py-4'>
                  <div className='bg-gray-100 p-2 h-fit w-fit rounded-xl mb-6'>
                    <Logo show/>
                  </div>
                    <div className=" text-white grid gap-2">
                        <p className=""> New to trovemart?</p>
                        <p className="text-gray-300 font-extralight font-mono ">Subscribe to our newsletter to get updates on our latest offers!</p>
                        <form action="" className=' rounded bg-gray-400 p-2 flex gap-2 w-fit text-gray-900' onSubmit={(e)=>{
                            e.preventDefault()
                        }} >
                            <i><Mail/></i>
                            <input type="email" className='bg-transparent text-xl w-full'/>
                        </form>
                    </div>
                    <div>
                        
                    </div>
                 </div>
            </Container>
            </div>

            <div className='bg-gray-700'>
                <Container>
                    <div className='grid grid-cols-auto-fit-md py-4 gap-10'>
                        {
                            footerLists.map((item,index)=>{
                                const {title,links}= item
                                return <div className="" key={index}>
                                    <p className="text-gray-100 pb-2 uppercase font-semibold">{title}</p>
                                <ul className="">
                                    {
                                        links.map((subitem,i)=>{
                                            const {txt,link}= subitem
                                            return <li key={i} className="text-gray-300 font-thin  pb-1"> 
                                                <a href={link} className="hover:underline">{txt}</a>
                                            </li>
                                        })
                                    }
                                </ul>
                                </div> 
                            })
                        }
                    </div>
                </Container>
            </div>
            <div className=" bg-gray-700 text-gray-200">
             <Container maxWidth='xl'>
             <span className='bg-gray-100 w-full block h-[1px] opacity-10'></span>
                 <div className='flex justify-between py-4'>
                     
                <p>@2024 trovemart</p>
                <div className="flex gap-2">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                 </div>
             </Container>
            </div>
        </footer>
     )
 }

 export default Footer