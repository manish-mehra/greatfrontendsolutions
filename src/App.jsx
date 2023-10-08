import React, {useState} from 'react'
import data from './data.json'
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedlight,
  atomDark
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
};


const CategoryClass  = {
  Easy: 'bg-green-500',
  Medium: 'bg-yellow-400',
  Hard: 'bg-red-500',
}


export default function App() {

  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showCode, setShowCode] = useState(false)

  return (
   <div className='flex justify-center'>
    <div className='pb-3 max-w-4xl'>
      <div className='mb-4'>
        <h1 className="text-2xl p-2 font-bold">Great Frontend Solutions</h1>
      </div>
      <div className='mb-4 p-2'>
        <p>This contains questions from <a href='#'>github. You can check out here for</a></p>
      </div>

      <div className='flex flex-col gap-2 w-full md:min-w-[700px] lg:min-w-[900px]'>
        {data.map((item, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <section className='flex justify-between mb-2 p-3 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer' 
              onClick={()=> {
                if(selectedQuestion === index) {
                  setSelectedQuestion(null)
                } else {
                  setSelectedQuestion(index)
                }
                setShowCode(false)
              }}>
                <h3 className='text-md font-medium'><span className='text-xs'>{index + 1}</span>. {item.name}</h3>
                <div className='flex gap-2 items-center'>
                  <span className={`text-xs font-semibold rounded-full px-2 py-1 ${CategoryClass[item.category]}`}>{item.category}</span>
                  <input type='checkbox' className='ml-2 w-4 h-4'/>
                </div>
              </section>

              {
                selectedQuestion === index && (
                <section className='p-3 rounded-lg border border-gray-300 shadow-md flex flex-col gap-3 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-6xl'>
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
                      {showCode ? 'Hide' : 'Show'} Code
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