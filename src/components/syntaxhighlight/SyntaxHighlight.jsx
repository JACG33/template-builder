import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import "highlight.js/styles/vs2015.min.css";
import { useEffect } from "react";

const SyntaxHighlight = ({ children, languageCss }) => {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('xml', xml)
    hljs.highlightAll();
  }, []);

  return (
    <pre><code className={languageCss}>
      {children}
    </code></pre>
  )
}

export default SyntaxHighlight