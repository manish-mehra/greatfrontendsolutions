import React, {useState} from 'react'
import data from './data.json'
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={atomDark}>
      {code}
    </SyntaxHighlighter>
  )
}


const CategoryClass  = {
  Easy: 'bg-green-500',
  Medium: 'bg-yellow-400',
  Hard: 'bg-red-500',
}


export default function App() {

  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showCode, setShowCode] = useState(false)
  const [solvedQuestions, setSolvedQuestions] = useState(JSON.parse(localStorage.getItem('solvedQuestions')) || [])

  return (
   <div className='flex justify-center'>
    <div className='pb-2 p-3 max-w-4xl w-full md:min-w-[700px] lg:min-w-[900px]'>
      <div className='mb-4'>
        <h1 className="text-2xl p-2 font-bold">GreatFrontEnd JS Solutions</h1>
      </div>
      <div className='mb-4 p-2 border border-black rounded-md font-medium'>
       <p className='pb-2'>
       This list contain the curated JavaScript challenges from the <a href = "https://www.greatfrontend.com/" className='text-blue-600'>Great Frontend website</a> with solutions.
       </p>
        <p className=''>
          These questions are tailored to:
        </p>
        <ul className='list-disc pl-4 pb-2'>
          <li className=''><b>Sharpen JavaScript Skills</b>: Enhance your proficiency in JavaScript programming.</li>
          <li><b>Boost Problem-Solving</b>: Tackle diverse challenges for creative solutions.</li>
          <li><b>Interview Prep</b>: Prepare for technical discussions with potential employers.</li>
        </ul>
      </div>
      <div className='mb-4 p-2 bg-gray-100 rounded-md'>
       <p className='text-xs font-medium pb-1'>
       These questions were originally curated from a GitHub repository created by <a href='https://github.com/ghoshsuman845' className='underline text-blue-600'>Suman Ghosh</a>. I have compiled and categorized them on this website for convenience. 
       This website is open source! You can find the codebase and contribute on my <a href="#" className='underline text-blue-600'>GitHub repository</a>. Feel free to collaborate and improve the experience for everyone.
        </p>
      </div>

      <div className='flex flex-col gap-2 pb-4'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-xs font-medium'>Click a question to reveal!</p>
          <p className='text-xs font-semibold'>solved: <span className='text-green-500 text-sm'>{solvedQuestions.length}</span>/{data.length}</p>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <section className='flex justify-between mb-2 p-3 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer' 
              onClick={(e)=> {
                if (e.target.type !== 'checkbox') {
                  if(selectedQuestion === index) {
                    setSelectedQuestion(null)
                  } else {
                    setSelectedQuestion(index)
                  }
                  setShowCode(false)
                }
              }}>
                <h3 className='text-md font-semibold'><span className='text-xs'>{index + 1}</span>. {item.name}</h3>
                <div className='flex gap-2 items-center'>
                  <span className={`text-xs font-semibold rounded-full px-2 py-1 ${CategoryClass[item.category]}`}>{item.category}</span>
                  <input 
                    type='checkbox' 
                    className='ml-2 w-4 h-4'
                    checked={solvedQuestions.includes(index)}
                    onChange={(e) => {
                      e.stopPropagation()
                      if(e.target.checked) {
                        setSolvedQuestions(prev => [...prev, index])
                        localStorage.setItem('solvedQuestions', JSON.stringify([...solvedQuestions, index]))
                      } else {
                        setSolvedQuestions(prev => prev.filter(item => item !== index))
                        localStorage.setItem('solvedQuestions', JSON.stringify(solvedQuestions.filter(item => item !== index)))
                      }
                  }}/>
                </div>
              </section>

              {
                selectedQuestion === index && (
                <section className='p-3 rounded-lg border border-gray-300 shadow-sm flex flex-col gap-3'>
                  <div className='text-sm leading-7 font-medium break-words'>
                    <Markdown 
                    components={{
                      code: ({node, ...props}) => {
                        if(props?.children?.includes('\n')) {
                          return <CodeBlock code={props.children}/>
                        } else {
                          return <code className='bg-gray-100 px-1 rounded-md'>{props.children}</code>
                        }

                      },
                      h1: ({node, ...props}) => <h1 className='text-xl font-bold' {...props} />,
                      h2: ({node, ...props}) => <h2 className='text-lg font-bold' {...props} />,
                      h3: ({node, ...props}) => <h3 className='text-md font-bold' {...props} />,
                      h4: ({node, ...props}) => <h4 className='text-sm font-bold' {...props} />,
                      h5: ({node, ...props}) => <h5 className='text-xs font-bold' {...props} />,
                      h6: ({node, ...props}) => <h6 className='text-xs font-bold' {...props} />,
                      p: ({node, ...props}) => <p className='text-sm leading-7' {...props} />,
                      a: ({node, ...props}) => <a className='text-blue-600 underline' {...props} />,
                      li: ({node, ...props}) => <li className='text-sm leading-7' {...props} />,
                      ul: ({node, ...props}) => <ul className='text-sm leading-7' {...props} />,
                      ol: ({node, ...props}) => <ol className='text-sm leading-7' {...props} />,
                    }}
                    className= ''
                    children={atob(item.md.content).split("Solution")[0]}
                    />
                    <span className='text-blue-700 font-semibold cursor-pointer' onClick={()=> setShowCode(prev => !prev)}>
                      {showCode ? 'Hide' : 'Show'} Solution
                    </span>
                  </div>
  
                    {
                      showCode && <CodeBlock code={atob(item.js.content)} />
                    }
              </section>
                )
              }         
            </div>
          )
        })}
      </div>
    </div>
   </div>
  )
}