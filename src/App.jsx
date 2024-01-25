import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'

function App() {
  const [data, setData] = React.useState(null)
  async function updateQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random')
      const { ...data } = await response.json()
      setData(data)
    } catch (error) {
      console.error(error)
      setData({ content: 'Opps Kuch toh glt ho gya bhai' })
    }
  }
  const colors = [
    '#F72585',
    '#B5179E',
    '#7209B7',
    '#560BAD',
    '#480CA8',
    '#3a0ca3',
    '#3f37c9',
    '#4361ee',
    '#4895ef',
    '#4895EF',
  ]
  const [count, setCount] = useState(0)

  useEffect(() => {
    updateQuote()
  }, [])
  if (!data) return null
  console.log(data)

  return (
    <>
      <div
        style={{ backgroundColor: colors[count] }}
        className="main-container"
      >
        <h1 className="title">Random Quote generator</h1>
        <div id="quote-box">
          <div className="text-container">
            <h2 id="text">{data.content}</h2>
          </div>
          <h3 id="author">{data.author}</h3>
          <br />
          <button
            style={{ backgroundColor: colors[count] }}
            onClick={() => {
              updateQuote()
              setCount((prev) => {
                if (prev < colors.length) {
                  return prev + 1
                } else {
                  return 0
                }
              })
            }}
            id="new-quote"
          >
            New Quotes
          </button>
          <br />
          <a
            style={{ color: colors[count] }}
            href={`https://www.twitter.com/intent/tweet?text=${data.content} %0a %0a- by ${data.author}`}
            target="blank"
            id="tweet-quote"
          >
            Twitter
          </a>
        </div>
      </div>
    </>
  )
}

export default App
