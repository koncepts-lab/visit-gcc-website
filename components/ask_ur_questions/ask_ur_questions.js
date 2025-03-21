import React from 'react'
import style from './style.module.css'
import Link from 'next/link'

function Ask_ur_questions() {
  return (
    <div>     <div className={`container-fluid ${style['ask-your-questions']}`}>

    <div className='col-md-12'>

        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <h3 className='text-black fw-semibold'>Ask Your Questions</h3>
                    <p>If your question has not been answered, you can submit your own by using the form below. Alternatively, feel free to <Link href='#0'><b><u>Contact Us</u></b></Link> and one of our staff will be happy to assist you.</p>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <input type='text' placeholder='Your Name'></input>
                </div>
                <div className='col-md-6'>
                    <input type='text' placeholder='Your Email'></input>
                </div>
                <div className='col-md-12'>
                    <textarea placeholder='Question'></textarea>

                </div>
                <div className='col-md-12'>
                    <button>ASK QUESTION</button>
                </div>
            </div>

        </div>
    </div>
</div></div>
  )
}

export default Ask_ur_questions