import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import './App.css';
import axios from "axios";



function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState(`Your Code Review will be displayed here!`);
  const [language, setLanguage] = useState("javascript");

  const [isLoading,setIsLoading]=useState(false);

  const supportedLanguages = {
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    cpp: "C++",
    c: "C",
    markup: "HTML"
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [language]);

  async function reviewCode() {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/ai/get-review', {
        code,
        language
      });

      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Failed to fetch review. Please check the server.");
      console.error(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      <h3 style={{
        textAlign:'center',
        marginTop:'0.3rem',
        marginBottom:'-0.7rem',
      }}>Code Reviewer</h3>
      <main>
        <div className='left'>

          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code =>
                Prism.highlight(code, Prism.languages[language], language)
              }
              padding={10}
              style={{
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                backgroundColor: "#2d2d2d",
                color: "#f8f8f2"
              }}
            />
          </div>

          <div onClick={reviewCode} className="review">Review</div>
        </div>

        <div className='right'>
          {
            isLoading ? <p className='text-xl ' ><em>🔄 Reviewing code, please wait <span className="loading loading-dots loading-xl"></span></em></p> :
            <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
          }
          
        </div>
      </main>
    </>
  );
}

export default App;
