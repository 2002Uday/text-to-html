# Text Formatter

A modern, responsive web application built with Next.js that converts plain text into formatted HTML with intelligent parsing for titles, numbered lists, and paragraphs.

## Features

### 🎯 Smart Text Formatting
- **Automatic Title Detection**: First line becomes an H2 heading if it's short and doesn't start with a number
- **Numbered List Recognition**: Automatically converts numbered items (1., 2., etc.) into HTML ordered lists
- **Paragraph Formatting**: Regular text becomes properly formatted paragraphs
- **Empty Line Preservation**: Maintains exact spacing and empty lines from the original input

### 🎨 Modern UI/UX
- **React Icons Integration**: Professional Material Design icons for copy and download actions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Buttons**: Hover effects and state-based styling
- **Tooltip Support**: Helpful tooltips on action buttons
- **Success Feedback**: Visual confirmation for copy operations

### 📋 Export Options
- **Copy to Clipboard**: One-click copying of formatted HTML
- **Download HTML File**: Generate and download complete HTML documents
- **Clean HTML Output**: Well-structured, properly indented HTML code

## Technology Stack

- **Framework**: Next.js 15.4.6 with React 19
- **Styling**: Tailwind CSS 4.0
- **Icons**: React Icons (Material Design)
- **Language**: TypeScript
- **Build Tool**: Turbopack (Next.js)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd text-formater
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Input Text**: Paste or type your plain text in the left panel
2. **Auto-Format**: The app automatically converts your text to HTML
3. **Preview**: See the formatted result in real-time
4. **Export**: Use the copy or download buttons to save your formatted HTML

### Example Input:
```
My Project Goals

1. Complete the user interface
2. Add responsive design
3. Implement dark mode

This is a regular paragraph with some details.


Another paragraph after an empty line.
```

### Generated Output:
```html
<!DOCTYPE HTML>
<HTML>
<HEAD>
    <TITLE>Prasang</TITLE>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
</HEAD>
<BODY>
    <div>
        <h2>My Project Goals</h2>

        <br>
        <ol>
            <li>Complete the user interface</li>
            <li>Add responsive design</li>
            <li>Implement dark mode</li>
        </ol>

        <p>This is a regular paragraph with some details.</p>

        <br>
        <br>
        <p>Another paragraph after an empty line.</p>

    </div>
</BODY>

</HTML>
```

## Project Structure

```
text-formater/
├── src/
│   └── app/
│       ├── globals.css          # Global styles
│       ├── layout.tsx           # Root layout component
│       └── page.tsx             # Main application component
├── public/                      # Static assets
├── tailwind.config.js          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Deployed on [Vercel](https://vercel.com/)
