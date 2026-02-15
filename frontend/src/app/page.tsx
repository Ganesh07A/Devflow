"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="font-sans antialiased bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden dark:bg-background-dark bg-background-light">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-white/5 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">DevFlow AI 2.0 is live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white leading-tight">
            Streamline your PRs<br />
            <span className="text-primary">with DevFlow AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Reviews for AI-powered teams who move fast. Cut code review time & bugs in half instantly with context-aware feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="#" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,87,34,0.3)]">
              Try it for free
              <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link href="#" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-surface-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              <span className="material-icons text-gray-400">play_circle</span>
              See how it works
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">Trusted by engineers at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center">
              <div className="h-8 w-auto relative">
                <Image src="/landing/google_logo.png" alt="Google" width={100} height={32} className="h-full w-auto object-contain" />
              </div>
              <div className="h-8 w-auto relative">
                <Image src="/landing/ibm_logo.png" alt="IBM" width={80} height={32} className="h-full w-auto object-contain" />
              </div>
              <div className="h-8 w-auto relative">
                <Image src="/landing/gcp_logo.png" alt="GCP" width={100} height={32} className="h-full w-auto object-contain" />
              </div>
              <div className="h-8 w-auto relative">
                <Image src="/landing/aws_logo.png" alt="AWS" width={60} height={32} className="h-full w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">2M+</h3>
            <p className="text-primary font-medium text-sm uppercase tracking-wide">Repositories Analyzed</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Optimized daily</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">75M+</h3>
            <p className="text-primary font-medium text-sm uppercase tracking-wide">Defects Found</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="material-icons text-sm text-yellow-500">bolt</span>
              <span>High confidence rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-5xl mx-auto px-4">
          <div className="glass-panel p-1 rounded-2xl shadow-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-surface-card group cursor-pointer">
              <Image
                src="/landing/dashboard_preview.png"
                alt="DevFlow Dashboard Interface showing code review"
                width={1200}
                height={675}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-icons text-white text-4xl ml-1">play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-left">
                <h4 className="text-white font-bold text-xl">See how DevFlow scales</h4>
                <p className="text-gray-300 text-sm">Scaling Code Quality with AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 dark:bg-background-dark bg-white relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Faster reviews + better code.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              We do the heavy lifting & spot the hard to find issues. You do the final 10%.
            </p>
            <Link href="#" className="inline-flex items-center text-primary mt-4 font-semibold hover:underline">
              See a sample review <span className="material-icons text-sm ml-1">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-gray-200 to-white dark:from-gray-800 dark:to-surface-card hover:from-primary/20 hover:to-surface-card transition-all duration-300">
              <div className="bg-white dark:bg-surface-card h-full rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-icons text-9xl text-primary transform rotate-12">rocket_launch</span>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <span className="material-icons text-primary text-2xl">speed</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Catch fast. Fix fast.</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">1-click commits for easy fixes and a "fix with AI" button for harder ones.</p>
                  <div className="mt-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image src="/landing/ai_fix_preview.png" alt="AI fix interface" width={500} height={200} className="w-full h-40 object-cover object-top opacity-80" />
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-gray-200 to-white dark:from-gray-800 dark:to-surface-card hover:from-accent-purple/20 hover:to-surface-card transition-all duration-300">
              <div className="bg-white dark:bg-surface-card h-full rounded-xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-6">
                    <span className="material-icons text-accent-purple text-2xl">summarize</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">TL;DR for your diff.</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Quick context with a summary of changes. A walkthrough is an architectural diagram.</p>
                  <div className="mt-8 bg-gray-900 rounded-lg p-4 border border-gray-700 font-mono text-xs text-gray-300">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p><span className="text-accent-purple">summary:</span> Refactored auth logic</p>
                      <p><span className="text-primary">impact:</span> Medium</p>
                      <p className="text-gray-500">Analysis complete...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-gray-200 to-white dark:from-gray-800 dark:to-surface-card hover:from-primary/20 hover:to-surface-card transition-all duration-300">
              <div className="bg-white dark:bg-surface-card h-full rounded-xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <span className="material-icons text-primary text-2xl">chat</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chat with the DevFlow bot</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Give feedback on reviews to create learnings. Or create issues, trigger workflows & more.</p>
                  <div className="mt-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">DF</div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg rounded-tl-none p-3 text-xs text-gray-700 dark:text-gray-300">
                      I noticed a potential SQL injection vulnerability in line 42. Shall I suggest a parameterized query?
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-gray-200 to-white dark:from-gray-800 dark:to-surface-card hover:from-accent-green/20 hover:to-surface-card transition-all duration-300">
              <div className="bg-white dark:bg-surface-card h-full rounded-xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center mb-6">
                    <span className="material-icons text-accent-green text-2xl">tune</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Most customizable tool.</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Customize everything from your coding guidelines to your workflow in a yaml file.</p>
                  <div className="mt-4 bg-gray-900 rounded p-3 font-mono text-xs border border-gray-700">
                    <p className="text-accent-green">rules:</p>
                    <p className="pl-2 text-gray-400">- name: Check complexity</p>
                    <p className="pl-4 text-gray-500">threshold: 15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 bg-gray-50 dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Integration</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The only tool that reviews everywhere you work.</h2>
            <p className="text-gray-600 dark:text-gray-400">Review at the PR stage or directly in your IDE & CLI.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
              <button className="px-6 py-4 text-left rounded-lg bg-white dark:bg-surface-card border border-gray-200 dark:border-gray-700 shadow-sm font-semibold text-gray-900 dark:text-white hover:border-primary transition-colors flex items-center gap-3 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                GIT Providers
              </button>
              <button className="px-6 py-4 text-left rounded-lg bg-transparent dark:text-gray-400 text-gray-500 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">IDE Plugins</button>
              <button className="px-6 py-4 text-left rounded-lg bg-transparent dark:text-gray-400 text-gray-500 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">CLI Tool</button>
            </div>
            <div className="lg:col-span-9 bg-white dark:bg-surface-card rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="w-8 h-8 relative">
                      <Image src="/landing/github_logo.png" alt="GitHub" width={32} height={32} className="dark:invert opacity-80" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">GitHub</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="w-8 h-8 relative">
                      <Image src="/landing/gitlab_logo.png" alt="GitLab" width={32} height={32} className="opacity-80" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">GitLab</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <span className="material-icons text-blue-500 text-3xl">cloud</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Azure DevOps</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <span className="material-icons text-blue-400 text-3xl">folder_open</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Bitbucket</span>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 shadow-2xl border border-gray-700 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">DF</div>
                      <span className="text-xs text-gray-400">devflow-bot commented 2m ago</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs space-y-1 mb-4 opacity-70">
                    <div className="flex gap-4">
                      <span className="text-gray-600 w-4">1</span>
                      <span><span className="text-purple-400">public</span> <span className="text-blue-400">static</span> <span className="text-yellow-300">void</span> main(...)</span>
                    </div>
                    <div className="flex gap-4 bg-red-500/10 -mx-4 px-4 border-l-2 border-red-500">
                      <span className="text-gray-600 w-4">2</span>
                      <span className="text-gray-300">String conn = "jdbc:mysql://...";</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-600 w-4">3</span>
                      <span className="text-gray-300">...</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded p-3 border border-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="material-icons text-primary text-sm mt-0.5">warning</span>
                      <div>
                        <p className="text-xs font-bold text-white mb-1">Security Vulnerability: Hardcoded Credentials</p>
                        <p className="text-xs text-gray-400">Ideally use environment variables or a config service.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="py-24 dark:bg-background-dark bg-background-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">In-Depth</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Industry-leading context.</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Codebase awareness is table-stakes. We pull in dozens more points of context than other tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-surface-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="h-40 w-full mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"></div>
                    <div className="absolute top-12 left-4 w-3 h-3 bg-purple-500 rounded-full z-10"></div>
                    <div className="absolute top-12 right-4 w-3 h-3 bg-blue-500 rounded-full z-10"></div>
                    <div className="absolute bottom-4 left-8 w-2 h-2 bg-gray-500 rounded-full z-10"></div>
                    <div className="absolute bottom-4 right-8 w-2 h-2 bg-gray-500 rounded-full z-10"></div>
                    <svg className="absolute inset-0 w-full h-full stroke-gray-700" style={{ strokeWidth: 1 }}>
                      <line x1="50%" x2="12%" y1="0" y2="37%"></line>
                      <line x1="50%" x2="88%" y1="0" y2="37%"></line>
                      <line x1="12%" x2="25%" y1="37%" y2="87%"></line>
                      <line x1="88%" x2="75%" y1="37%" y2="87%"></line>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Codebase Intelligence</h3>
              <p className="text-sm text-gray-500">Language and custom guidelines help us understand complex dependencies across files to assess impact.</p>
            </div>
            <div className="bg-white dark:bg-surface-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="h-40 w-full mb-6 relative flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 opacity-80">
                  <div className="w-12 h-16 bg-gray-800 rounded border border-gray-700 flex flex-col p-1 gap-1">
                    <div className="h-1 w-full bg-gray-600 rounded"></div>
                    <div className="h-1 w-2/3 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-12 h-16 bg-gray-800 rounded border border-gray-700 flex flex-col p-1 gap-1 mt-4">
                    <div className="h-1 w-full bg-blue-500 rounded"></div>
                    <div className="h-1 w-2/3 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. External context</h3>
              <p className="text-sm text-gray-500">We bring the right context via AST parsers, Linked Issues (Jira & Linear) & Web Search for the latest SDK info.</p>
            </div>
            <div className="bg-white dark:bg-surface-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="h-40 w-full mb-6 relative flex items-center justify-center">
                <span className="material-icons text-7xl text-gray-800 dark:text-gray-700">bug_report</span>
                <span className="material-icons text-4xl text-green-500 absolute bottom-8 right-16">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Linters & Scanners</h3>
              <p className="text-sm text-gray-500">Our linters and security scanners catch more bugs while we filter out the noise from false positives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">Ready to ship faster?</h2>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <span className="material-icons text-9xl text-white">code</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Start your free trial</h3>
                <p className="text-gray-400">No credit card required. 14-day free trial on Pro plan.</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <button className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-colors w-full">
                  Install on GitHub
                </button>
                <button className="bg-transparent border border-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/5 transition-colors w-full">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-dark py-12 border-t border-gray-200 dark:border-gray-800 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="material-icons text-white text-xs">code</span>
                </div>
                <span className="font-bold text-lg dark:text-white">DevFlow</span>
              </div>
              <p className="text-gray-500 mb-6 max-w-xs">
                AI-powered code reviews that actually understand your code. Helping teams ship faster since 2023.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></Link>
                <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">GitHub</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path></svg></Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold dark:text-white mb-4 text-primary">Products</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Code Review</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">IDE Extension</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">CLI Tool</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold dark:text-white mb-4 text-primary">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Community</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold dark:text-white mb-4 text-primary">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">About</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Contact</Link></li>
                <li><Link href="#" className="text-gray-500 hover:text-primary dark:hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2026 DevFlow Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Terms</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}