import { useState } from 'react';
import { useEffect } from 'react';
import { Remarkable } from 'remarkable';

const Markable = props => {
    const { md } = props;
    const [html, setHtml] = useState('');

    useEffect(() => {
        const remarkable = new Remarkable({
            html:         true,        // Enable HTML tags in source
            xhtmlOut:     true,        // Use '/' to close single tags (<br />)
            breaks:       true,        // Convert '\n' in paragraphs into <br>
            langPrefix:   'language-',  // CSS language prefix for fenced blocks
        
            // Enable some language-neutral replacement + quotes beautification
            typographer:  false,
        
            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
            quotes: '“”‘’',
        
            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed
            highlight: function (/*str, lang*/) { return ''; }
        });
        const contentHtml = remarkable.render(md);
        setHtml(contentHtml);
    }, [md]);



    return (
        <div dangerouslySetInnerHTML={{ __html: html }}>
        </div>
    );
};

export default Markable;
