import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import "highlight.js/styles/vs2015.min.css";
import { useEffect, useRef } from "react";

hljs.configure({
  ignoreUnescapedHTML: true
})
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

const SyntaxHighlight = ({ children, languageCss }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      // Eliminar el atributo que indica que el elemento ya fue resaltado
      codeRef.current.removeAttribute('data-highlighted');
      
      // Aplicar nuevamente el resaltado de sintaxis al elemento
      hljs.highlightElement(codeRef.current);
    }
  }, [children]);
  
  return (
    <pre>
      <code ref={codeRef} className={languageCss}>
        {children}
      </code>
    </pre>
  );
}

export default SyntaxHighlight;
