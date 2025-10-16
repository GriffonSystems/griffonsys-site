import React from 'react'
import axios from 'axios'

export default function Contact() {
  // Toggle this to true when Twilio is live
  const ENABLE_TWILIO = false

  const [state, setState] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = React.useState('idle')

  // Twilio-related state (currently hidden until ENABLE_TWILIO = true)
  const [textMsg, setTextMsg] = React.useState({ phone: '', message: '' })
  const [textStatus, setTextStatus] = React.useState('idle')
  const [showTextForm, setShowTextForm] = React.useState(false)
  const [textFeedback, setTextFeedback] = React.useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await axios.post('/api/contact', state)
      setStatus('ok')
      setState({ name: '', email: '', phone: '',
