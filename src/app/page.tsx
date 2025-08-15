'use client';

import { useState } from 'react';
import { MdContentCopy, MdCheck, MdDownload } from 'react-icons/md';

export default function TextFormatter() {
  const [inputText, setInputText] = useState('');
  const [formattedHtml, setFormattedHtml] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to format plain text to HTML
  const formatTextToHtml = (text: string) => {
    if (!text.trim()) {
      setFormattedHtml('');
      return;
    }

    // Split lines but preserve all lines including empty ones
    const lines = text.split('\n');
    let html = '';
    let listItems: string[] = [];
    let listCounter = 1;
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Handle empty lines - preserve them as <br> tags
      if (trimmedLine === '') {
        // Close any open list before adding empty line
        if (inList && listItems.length > 0) {
          html += `        <ol${listCounter > 1 ? ` start="${listCounter}"` : ''}>\n`;
          listItems.forEach(item => {
            html += `            <li>${item}</li>\n`;
          });
          html += `        </ol>\n\n`;
          listCounter += listItems.length;
          listItems = [];
          inList = false;
        }
        html += `        <br>\n`;
        continue;
      }
      
      // Check if line looks like a title (first non-empty line and short)
      if (i === 0 && trimmedLine.length < 50 && !trimmedLine.match(/^\d+\./)) {
        html += `        <h2>${trimmedLine}</h2>\n\n`;
        continue;
      }
      
      // Check if line looks like a numbered point or starts with a number
      const numberedMatch = trimmedLine.match(/^\d+\.?\s*(.+)/);
      if (numberedMatch) {
        if (!inList) {
          // Start new list
          if (listItems.length > 0) {
            // Close previous list
            html += `        <ol${listCounter > 1 ? ` start="${listCounter}"` : ''}>\n`;
            listItems.forEach(item => {
              html += `            <li>${item}</li>\n`;
            });
            html += `        </ol>\n\n`;
            listCounter += listItems.length;
            listItems = [];
          }
          inList = true;
        }
        listItems.push(numberedMatch[1]);
        continue;
      }
      
      // If we were in a list and this line doesn't match, close the list
      if (inList) {
        html += `        <ol${listCounter > 1 ? ` start="${listCounter}"` : ''}>\n`;
        listItems.forEach(item => {
          html += `            <li>${item}</li>\n`;
        });
        html += `        </ol>\n\n`;
        listCounter += listItems.length;
        listItems = [];
        inList = false;
      }
      
      // Regular paragraph - preserve original spacing
      html += `        <p>${trimmedLine}</p>\n\n`;
    }
    
    // Close any remaining list
    if (inList && listItems.length > 0) {
      html += `        <ol${listCounter > 1 ? ` start="${listCounter}"` : ''}>\n`;
      listItems.forEach(item => {
        html += `            <li>${item}</li>\n`;
      });
      html += `        </ol>\n\n`;
    }

    // Create complete HTML document
    const completeHtml = `<!DOCTYPE HTML>\n<HTML>\n<HEAD>\n    <TITLE>Prasang</TITLE>\n    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">\n    <script>\n        function resizeText(multiplier) {\n            if (document.body.style.fontSize == \"\") {\n                document.body.style.fontSize = \"1.0em\";\n            }\n            document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.1) + \"em\";\n        }\n    </script>\n</HEAD>\n<BODY>\n    <div class=\"wrap\">\n        <ul class=\"reader_tools noselect\">\n            <li><button class=\"inc_fontsize\" onclick=\"resizeText(1)\">A+</button></li>\n            <li><button class=\"dec_fontsize\" onClick=\"resizeText(-1)\">A-</button></li>\n        </ul>\n    </div>\n    <div>\n${html}    </div>\n</BODY>\n\n</HTML>`;

    setFormattedHtml(completeHtml);
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedHtml);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Download text file function
  const downloadHtmlFile = () => {
    if (!formattedHtml) return;
    
    const blob = new Blob([formattedHtml], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    formatTextToHtml(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Text Formatter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your plain text into beautifully formatted HTML with editor options
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Input Text</h2>
                <p className="text-sm text-gray-600 mt-1">Paste your plain text here</p>
              </div>
              <button
                onClick={() => {
                  setInputText('');
                  setFormattedHtml('');
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="p-6">
              <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Paste your text here..."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Formatted HTML</h2>
                <p className="text-sm text-gray-600 mt-1">Ready to copy or download HTML output</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!formattedHtml}
                  title={copySuccess ? 'Copied!' : 'Copy HTML'}
                  className={`p-2 rounded-lg transition-all hover:bg-gray-100 ${
                    formattedHtml
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {copySuccess ? (
                    <MdCheck className="w-5 h-5" />
                  ) : (
                    <MdContentCopy className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={downloadHtmlFile}
                  disabled={!formattedHtml}
                  title="Download HTML"
                  className={`p-2 rounded-lg transition-all hover:bg-gray-100 ${
                    formattedHtml
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <MdDownload className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={formattedHtml}
                readOnly
                placeholder="Formatted HTML will appear here..."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none bg-gray-50 font-mono text-sm text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {formattedHtml && (
          <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                  <p className="text-sm text-gray-600 mt-1">How your formatted text will look</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Font Size:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors text-gray-800"
                    >
                      A-
                    </button>
                    <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-center">
                      {fontSize}px
                    </span>
                    <button
                      onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors text-gray-800"
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div 
                className="prose max-w-none text-gray-900"
                style={{ fontSize: `${fontSize}px`, color: '#000000' }}
                dangerouslySetInnerHTML={{ 
                  __html: formattedHtml.match(/<BODY[^>]*>([\s\S]*?)<\/BODY>/i)?.[1] || '' 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
