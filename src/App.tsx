/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ThemeToggle from "./components/custom/theme-toggle";

// icons
import { FaStar as StarIcon } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import q_data from "@/constants/data.json";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <SyntaxHighlighter language="javascript" style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
};

const categoryColor = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-400",
  Hard: "bg-red-500",
};

const categories = ["All", "Easy", "Medium", "Hard"];

const App = () => {
  const storedSolvedQuestions = localStorage.getItem("solvedQuestions");
  const initialSolvedQuestions: number[] = storedSolvedQuestions
    ? JSON.parse(storedSolvedQuestions)
    : [];

  const [solvedQuestions, setSolvedQuestions] = useState<number[]>(
    initialSolvedQuestions
  );

  const [showCode, setShowCode] = useState(false);
  const [filteredData, setFilteredData] = useState(q_data);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredData(q_data);
    } else {
      const newData = q_data.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredData(newData);
    }
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4  space-y-4">
      <div className="flex w-full items-center  justify-between">
        <h1 className="text-2xl p-2 font-bold">GreatFrontEnd JS Solutions</h1>
        <ThemeToggle />
      </div>
      <div className="mb-4 p-4 border bg-gray-100/10 border-zinc-300 dark:border-zinc-800 rounded-md font-medium">
        <p className="pb-2">
          This list contain the curated JavaScript challenges from the{" "}
          <a href="https://www.greatfrontend.com/" className="text-blue-600">
            Great Frontend website
          </a>{" "}
          with solutions.
        </p>
        <p className="">These questions are tailored to:</p>
        <ul className="list-disc pl-4 pb-2">
          <li className="">
            <b>Sharpen JavaScript Skills</b>: Enhance your proficiency in
            JavaScript programming.
          </li>
          <li>
            <b>Boost Problem-Solving</b>: Tackle diverse challenges for creative
            solutions.
          </li>
          <li>
            <b>Interview Prep</b>: Prepare for technical discussions with
            potential employers.
          </li>
        </ul>
      </div>
      <div className="mb-4 p-4 bg-gray-100/10  border border-zinc-300 dark:border-zinc-800 rounded-md">
        <p className="text-xs font-medium pb-1">
          These questions were originally curated from a GitHub repository
          created by{" "}
          <a
            href="https://github.com/ghoshsuman845"
            className="underline text-blue-600"
          >
            Suman Ghosh
          </a>
          . I have compiled and categorized them on this website for
          convenience. This website is open source! You can find the codebase
          and contribute on my{" "}
          <a
            href="https://github.com/manish-mehra/greatfrontendsolutions"
            className="underline text-blue-600"
          >
            GitHub repository
          </a>
          . Feel free to collaborate and improve the experience for everyone.
        </p>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between">
          <p className="font-medium">Questions</p>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-24 md:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Accordion type="single" collapsible>
          {filteredData.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="w-full"
            >
              <div className="flex w-full items-center justify-between">
                <AccordionTrigger onClick={() => setShowCode(false)}>
                  {item.name}
                </AccordionTrigger>
                <div className="flex gap-2 items-center">
                  <Badge
                    variant="default"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    className={categoryColor[item.category] || "bg-blue-500"}
                  >
                    {item.category}
                  </Badge>

                  <Checkbox
                    checked={solvedQuestions.includes(index)}
                    onCheckedChange={(value) => {
                      if (value) {
                        setSolvedQuestions((prev) => [...prev, index]);
                        localStorage.setItem(
                          "solvedQuestions",
                          JSON.stringify([...solvedQuestions, index])
                        );
                      } else {
                        setSolvedQuestions((prev) =>
                          prev.filter((item) => item !== index)
                        );
                        localStorage.setItem(
                          "solvedQuestions",
                          JSON.stringify(
                            solvedQuestions.filter((item) => item !== index)
                          )
                        );
                      }
                    }}
                  />
                </div>
              </div>
              <AccordionContent className="border border-blue-500 p-3 rounded-lg">
                <Markdown
                  components={{
                    code: ({ ...props }: any) => {
                      if (props?.children?.includes("\n")) {
                        return <CodeBlock code={props.children} />;
                      } else {
                        return (
                          <code className="bg-gray-100 px-1 rounded-md">
                            {props.children}
                          </code>
                        );
                      }
                    },
                    h1: ({ ...props }: any) => (
                      <h1 className="text-xl font-bold" {...props} />
                    ),
                    h2: ({ ...props }: any) => (
                      <h2 className="text-lg font-bold" {...props} />
                    ),
                    h3: ({ ...props }: any) => (
                      <h3 className="text-md font-bold" {...props} />
                    ),
                    h4: ({ ...props }: any) => (
                      <h4 className="text-sm font-bold" {...props} />
                    ),
                    h5: ({ ...props }: any) => (
                      <h5 className="text-xs font-bold" {...props} />
                    ),
                    h6: ({ ...props }: any) => (
                      <h6 className="text-xs font-bold" {...props} />
                    ),
                    p: ({ ...props }: any) => (
                      <p className="text-sm leading-7" {...props} />
                    ),
                    a: ({ ...props }: any) => (
                      <a className="text-blue-600 underline" {...props} />
                    ),
                    li: ({ ...props }: any) => (
                      <li className="text-sm leading-7" {...props} />
                    ),
                    ul: ({ ...props }: any) => (
                      <ul className="text-sm leading-7" {...props} />
                    ),
                    ol: ({ ...props }: any) => (
                      <ol className="text-sm leading-7" {...props} />
                    ),
                  }}
                  children={atob(item.md.content).split("Solution")[0]}
                />
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={() => setShowCode((prev) => !prev)}
                >
                  {showCode ? "Hide" : "Show"} Solution
                </Button>

                {showCode && <CodeBlock code={atob(item.js.content)} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <a
        href="https://github.com/manish-mehra/greatfrontendsolutions"
        target="_blank"
        className=" fixed right-3 bottom-3 bg-slate-800 text-white inline-flex py-2 md:py-4 px-3 md:px-8 text-xs md:text-base rounded-md"
      >
        Give a <StarIcon className="text-yellow-500 mx-1" /> to this repo on
        GitHub
      </a>
    </div>
  );
};

export default App;
