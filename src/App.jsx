import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Seo } from './components/Seo'
import { Button, buttonVariants } from './components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card'
import { useReveal } from './hooks/useReveal'
import { cn } from './lib/utils'

const CHURCH_BRANCHES = ['GPC TORONTO', 'GPC OSHAWA', 'GPC EDMONTON']

const EMPLOYMENT_OPTIONS = [
  'Employed (Full-Time)',
  'Employed (Part-Time)',
  'Self-Employed',
  'Unemployed',
  'Student',
  'Homemaker',
  'Retired',
  'Other',
]

const GOAL_OPTIONS = [
  'Get a better Job',
  'Increase my salary',
  'Start a business',
  'Learn tech/AI Skills',
  'Build a side hustle',
  'Career change',
  'Leadership Development',
]

const TRACK_OPTIONS = [
  'AI Generalist',
  'Business & Career',
  'IT Enthusiast',
  'Not sure yet',
]

const SKILL_OPTIONS = [
  'AI tools',
  'Data/Analytics',
  'Cloud Computing',
  'Digital Marketing',
  'Business Setup',
  'Sales & negotiation',
  'Coding/Software',
  'Leadership skills',
  'Financial literacy',
  'Other',
]

function RevealSection({ children, className }) {
  const { ref, inView } = useReveal()
  return (
    <div
      ref={ref}
      className={cn(
        inView ? 'animate-slide-up' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

function RegistrationPage() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    branch: '',
    email: '',
    phone: '',
    employmentStatus: '',
    employmentOther: '',
    mainGoal: '',
    track: '',
    skill: '',
    incomeGoal: '',
    serveInterest: '',
    contribution: '',
    comments: '',
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    const requiredFields = [
      'fullName',
      'branch',
      'email',
      'phone',
      'employmentStatus',
      'mainGoal',
      'track',
      'skill',
      'serveInterest',
    ]
    const hasMissingRequired = requiredFields.some((field) => {
      const value = form[field]
      return typeof value !== 'string' || value.trim() === ''
    })

    if (hasMissingRequired) {
      const errorMessage = 'Please complete all required fields.'
      setMessage(errorMessage)
      toast.error(errorMessage)
      return
    }

    try {
      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setMessage('Submitted successfully!')
      toast.success('Registration received! We will be in touch soon.')
      navigate('/success')
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
      toast.error('Submission failed. Please try again.')
    }
  }

  const inputBase =
    'mt-2 w-full rounded-md border border-border/70 bg-white/80 px-4 py-3 text-sm shadow-sm transition focus:border-brand/70 focus:outline-none focus:ring-2 focus:ring-brand/25 dark:bg-white/5'

  const formTitle = useMemo(
    () => 'HIC Career Interest Registration Form',
    [],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_hsl(var(--brand)/0.18),_transparent_55%)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,_hsl(var(--brand)/0.14),_transparent_40%,_hsl(var(--brand)/0.22))] bg-[length:200%_200%] opacity-70 animate-gradient-xy" />
      <Seo
        title="Registration"
        description="Register your interest in the HIC Career Initiative and share your goals and skill interests."
      />
      <header
        className={cn(
          'no-print border-b border-border/50 bg-white/70 backdrop-blur-xl transition-shadow dark:bg-white/5',
          isScrolled && 'shadow-soft',
        )}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Gospel Pillars International logo"
              className="h-14 w-auto rounded-lg bg-white/70 p-2 shadow-soft"
            />
            <div>
              <p className="section-subtitle">Gospel Pillars International</p>
              <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
                Business & Career Development Initiative
              </h1>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="no-print"
            onClick={() => setIsDark((prev) => !prev)}
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <RevealSection>
          <Card className="glass">
            <CardHeader>
              <p className="section-subtitle">Registration</p>
              <h2 className="section-title">{formTitle}</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Complete the form below to join the HIC Career Interest
                  community. We use your responses to connect you with the
                  right opportunities and support.
                </p>
              </div>
            </CardHeader>
          </Card>
        </RevealSection>

        <RevealSection>
          <Card className="glass">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {message ? (
                  <div className="rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 text-sm font-medium text-foreground">
                    {message}
                  </div>
                ) : null}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">
                      Full Name <span className="text-brand">*</span>
                    </span>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className={inputBase}
                      placeholder="Your answer"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">
                      Church Branch <span className="text-brand">*</span>
                    </span>
                    <div className="relative">
                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        className={cn(
                          inputBase,
                          'appearance-none bg-white/90 pr-10 dark:bg-white/5',
                        )}
                        required
                      >
                        <option value="">Choose</option>
                        {CHURCH_BRANCHES.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ▾
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">
                      Email Address <span className="text-brand">*</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputBase}
                      placeholder="Your answer"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">
                      Phone Number <span className="text-brand">*</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputBase}
                      placeholder="Your answer"
                      required
                    />
                  </label>
                </div>

                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-foreground">
                    Current Employment Status{' '}
                    <span className="text-brand">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {EMPLOYMENT_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-brand/40 dark:bg-white/5"
                      >
                        <input
                          type="radio"
                          name="employmentStatus"
                          value={option}
                          checked={form.employmentStatus === option}
                          onChange={handleChange}
                          className="text-brand focus:ring-brand/40"
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    If you selected “Other” above, please provide details of
                    your specific role
                  </span>
                  <input
                    name="employmentOther"
                    value={form.employmentOther}
                    onChange={handleChange}
                    className={cn(
                      inputBase,
                      form.employmentStatus !== 'Other' &&
                        'cursor-not-allowed opacity-60',
                    )}
                    placeholder="Your answer"
                    disabled={form.employmentStatus !== 'Other'}
                  />
                </label>

                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-foreground">
                    What best describes your main goal right now?{' '}
                    <span className="text-brand">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GOAL_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-brand/40 dark:bg-white/5"
                      >
                        <input
                          type="radio"
                          name="mainGoal"
                          value={option}
                          checked={form.mainGoal === option}
                          onChange={handleChange}
                          className="text-brand focus:ring-brand/40"
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-foreground">
                    Which skill acquisition track are you Most interested in{' '}
                    <span className="text-brand">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {TRACK_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-brand/40 dark:bg-white/5"
                      >
                        <input
                          type="radio"
                          name="track"
                          value={option}
                          checked={form.track === option}
                          onChange={handleChange}
                          className="text-brand focus:ring-brand/40"
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-foreground">
                    Which skills are you Most interested in learning{' '}
                    <span className="text-brand">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SKILL_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-brand/40 dark:bg-white/5"
                      >
                        <input
                          type="radio"
                          name="skill"
                          value={option}
                          checked={form.skill === option}
                          onChange={handleChange}
                          className="text-brand focus:ring-brand/40"
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    Which is your income goal for the next 12 months?
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Example: CAD 40k salary, CAD 5k side income, CAD 10k
                    business revenue, etc.
                  </span>
                  <input
                    name="incomeGoal"
                    value={form.incomeGoal}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Your answer"
                  />
                </label>

                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-foreground">
                    Would you like to serve as a Chapter HIC Lead, Champion, or
                    Volunteer? <span className="text-brand">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Yes: I'm interested in leadership",
                      'Yes: I can volunteer',
                      'Not right now',
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-white/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-brand/40 dark:bg-white/5"
                      >
                        <input
                          type="radio"
                          name="serveInterest"
                          value={option}
                          checked={form.serveInterest === option}
                          onChange={handleChange}
                          className="text-brand focus:ring-brand/40"
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    If yes, what skills or experience can you contribute?
                  </span>
                  <input
                    name="contribution"
                    value={form.contribution}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Your answer"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-foreground">
                    Any additional comments or prayer requests?
                  </span>
                  <textarea
                    name="comments"
                    value={form.comments}
                    onChange={handleChange}
                    className={cn(inputBase, 'min-h-[120px] resize-y')}
                    placeholder="Your answer"
                  />
                </label>

                <CardFooter className="justify-between">
                  <Button type="submit" size="lg">
                    Submit
                  </Button>
                  <Button
                    type="reset"
                    variant="ghost"
                    onClick={() =>
                      setForm({
                        fullName: '',
                        branch: '',
                        email: '',
                        phone: '',
                        employmentStatus: '',
                        employmentOther: '',
                        mainGoal: '',
                        track: '',
                        skill: '',
                        incomeGoal: '',
                        serveInterest: '',
                        contribution: '',
                        comments: '',
                      })
                    }
                  >
                    Clear form
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </RevealSection>

        <RevealSection>
          <Card className="glass">
            <CardHeader>
              <p className="section-subtitle">Need help?</p>
              <h3 className="section-title text-xl sm:text-2xl">
                We are here to support you.
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Reach out to the HIC team for guidance or prayer support. We
                appreciate your interest and look forward to walking with you.
              </p>
            </CardHeader>
            <CardFooter>
              <a
                href="mailto:gpccanadasocialmedia@gmail.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'primary' }))}
              >
                Contact the HIC Team
              </a>
            </CardFooter>
          </Card>
        </RevealSection>
      </main>
    </div>
  )
}

function SuccessPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_hsl(var(--brand)/0.18),_transparent_55%)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,_hsl(var(--brand)/0.14),_transparent_40%,_hsl(var(--brand)/0.22))] bg-[length:200%_200%] opacity-70 animate-gradient-xy" />
      <Seo
        title="Thank You"
        description="Thank you for registering your interest in the HIC Career Initiative."
      />
      <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
        <Card className="glass w-full">
          <CardHeader>
            <p className="section-subtitle">Submission received</p>
            <h2 className="section-title">Thank you for registering!</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Your responses have been recorded. Our team will review them and
              follow up with next steps soon.
            </p>
          </CardHeader>
          <CardFooter>
            <Link to="/" className={cn(buttonVariants({}))}>
              Back to the form
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
