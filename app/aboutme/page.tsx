"use client";

import React from "react";
import Image from "next/image";

export default function CV() {
    return (
        <div className="min-h-screen bg-[#2E2A3B] flex">
            {/* Left sidebar - terracotta color, fixed to left edge */}
            <div className="w-full max-w-[320px] lg:max-w-[380px] bg-[#6D4941] p-5 sm:p-7 flex flex-col items-center overflow-y-auto h-screen">
                {/* Profile photo */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#D9BBA0] mb-6">
                    <Image
                        src="/profile-placeholder.jpg"
                        alt="Profile Photo"
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Contact Information */}
                <div className="w-full">
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        Contact Info
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-[#D9BBA0] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm sm:text-base break-all text-white">your.email@example.com</span>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-[#D9BBA0] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm sm:text-base text-white">+1 234 567 890</span>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-[#D9BBA0] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm sm:text-base text-white">City, Country</span>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-[#D9BBA0] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <a href="https://github.com/yourusername" className="text-sm sm:text-base text-[#D9BBA0] hover:underline break-all">
                                github.com/yourusername
                            </a>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-[#D9BBA0] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <a href="https://linkedin.com/in/yourusername" className="text-sm sm:text-base text-[#D9BBA0] hover:underline break-all">
                                linkedin.com/in/yourusername
                            </a>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        Skills
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">JavaScript/TypeScript</span>
                                <span className="text-sm sm:text-base text-white">90%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "90%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">React/Next.js</span>
                                <span className="text-sm sm:text-base text-white">85%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "85%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">Node.js</span>
                                <span className="text-sm sm:text-base text-white">80%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "80%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">UI/UX Design</span>
                                <span className="text-sm sm:text-base text-white">75%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Languages */}
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        Languages
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">English</span>
                                <span className="text-sm sm:text-base text-white">Native</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">Spanish</span>
                                <span className="text-sm sm:text-base text-white">Fluent</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "90%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm sm:text-base text-white">French</span>
                                <span className="text-sm sm:text-base text-white">Intermediate</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-[#D9BBA0] h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content - stretches to fill remaining width */}
            <div className="flex-grow bg-[#49416D] overflow-y-auto h-screen p-6 sm:p-8 lg:p-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#D9BBA0]">Your Name</h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mt-1 mb-6">Software Engineer</h2>

                {/* About Me */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        About Me
                    </h2>
                    <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                        Passionate software engineer with expertise in full-stack development, focusing on creating
                        responsive and intuitive web applications. Dedicated to writing clean, maintainable code and
                        constantly learning new technologies. Experienced in agile methodologies and team collaboration.
                    </p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        Experience
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                <h3 className="text-lg font-semibold">Senior Software Engineer</h3>
                                <span className="text-sm text-[#D9BBA0] mt-1 sm:mt-0">Jan 2022 - Present</span>
                            </div>
                            <p className="text-gray-300 italic text-sm sm:text-base">TechCorp Inc.</p>
                            <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-gray-200 space-y-1">
                                <li>Led development of a Next.js dashboard application for monitoring IoT devices</li>
                                <li>Implemented real-time data visualization with WebSocket integration</li>
                                <li>Optimized application performance by 40% through code refactoring and caching</li>
                                <li>Mentored junior developers and conducted code reviews</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                <h3 className="text-lg font-semibold">Frontend Developer</h3>
                                <span className="text-sm text-[#D9BBA0] mt-1 sm:mt-0">Mar 2019 - Dec 2021</span>
                            </div>
                            <p className="text-gray-300 italic text-sm sm:text-base">WebSolutions Ltd.</p>
                            <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-gray-200 space-y-1">
                                <li>Developed responsive user interfaces using React and TypeScript</li>
                                <li>Collaborated with designers to implement UI/UX improvements</li>
                                <li>Integrated RESTful APIs and implemented state management with Redux</li>
                                <li>Participated in agile development processes and daily stand-ups</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        Education
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                <h3 className="text-lg font-semibold">M.S. Computer Science</h3>
                                <span className="text-sm text-[#D9BBA0] mt-1 sm:mt-0">2016 - 2018</span>
                            </div>
                            <p className="text-gray-300 italic text-sm sm:text-base">University of Technology</p>
                            <p className="mt-2 text-gray-200 text-sm sm:text-base">
                                Specialized in Software Engineering with focus on distributed systems.
                                Thesis: "Optimization Techniques for Real-time Web Applications"
                            </p>
                        </div>

                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                <h3 className="text-lg font-semibold">B.S. Computer Engineering</h3>
                                <span className="text-sm text-[#D9BBA0] mt-1 sm:mt-0">2012 - 2016</span>
                            </div>
                            <p className="text-gray-300 italic text-sm sm:text-base">State University</p>
                            <p className="mt-2 text-gray-200 text-sm sm:text-base">
                                Graduated with honors. Participated in the university's programming team competition.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Projects */}
                <div>
                    <h2 className="text-xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2 mb-4">
                        Personal Projects
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold">IoT Dashboard</h3>
                            <p className="text-gray-300 italic text-sm sm:text-base">Next.js, TypeScript, MQTT, Supabase</p>
                            <p className="mt-2 text-gray-200 text-sm sm:text-base">
                                A real-time monitoring system for IoT devices with customizable alerts and visualization.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Portfolio Website</h3>
                            <p className="text-gray-300 italic text-sm sm:text-base">React, TailwindCSS, Three.js</p>
                            <p className="mt-2 text-gray-200 text-sm sm:text-base">
                                Personal portfolio showcasing projects with interactive 3D elements and responsive design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}