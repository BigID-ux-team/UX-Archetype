

import React, { useState } from 'react';
import { AlertTriangle, RefreshCcw, LayoutGrid, List, CheckCircle, Users, BarChart3, Zap } from 'lucide-react';
// CollapsibleSection is kept in case it's used elsewhere or in the future,
// but it's not used for the new combined archetype display.
// import CollapsibleSection from './components/CollapsibleSection'; 
import { archetypesData, decisionMapQuestions } from './constants';
import { Archetype, DecisionQuestion } from './types';

type ArchetypeViewMode = 'grid' | 'cards';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [suggestedArchetypes, setSuggestedArchetypes] = useState<Archetype[]>([]);
  const [archetypeViewMode, setArchetypeViewMode] = useState<ArchetypeViewMode>('grid');

  const questions: DecisionQuestion[] = decisionMapQuestions;

  const handleAnswer = (archetypesToSuggest: Archetype[]) => {
    setSuggestedArchetypes(archetypesToSuggest);
    setCurrentQuestionIndex(questions.length);
  };

  const resetDecisionMap = () => {
    setCurrentQuestionIndex(0);
    setSuggestedArchetypes([]);
  };

  const handleFinalNo = () => {
    setSuggestedArchetypes([]);
    setCurrentQuestionIndex(questions.length);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const renderArchetypeCard = (archetype: Archetype) => (
    <div key={archetype.name} className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${archetype.group === "Privacy Professionals" ? 'border-blue-500' : 'border-green-500'} flex flex-col h-full`}>
      <div className="flex items-center mb-4">
        {archetype.icon && <archetype.icon size={28} className={`${archetype.group === "Privacy Professionals" ? "text-blue-600" : "text-green-600"} mr-3 flex-shrink-0`} />}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{archetype.name}</h3>
          <p className={`text-sm ${archetype.group === "Privacy Professionals" ? "text-blue-600" : "text-green-600"}`}>{archetype.group}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm text-gray-700 flex-grow">
        <p><strong className="font-medium text-gray-900">Core Identity:</strong> {archetype.coreIdentity}</p>
        <p><strong className="font-medium text-gray-900">Key Traits:</strong> {archetype.keyTraits}</p>
        <p><strong className="font-medium text-gray-900">Goals:</strong> {archetype.goals}</p>
        <p><strong className="font-medium text-gray-900">Challenges:</strong> {archetype.challenges}</p>
        <p><strong className="font-medium text-gray-900">UX Needs:</strong> {archetype.uxNeeds}</p>
        <p><strong className="font-medium text-gray-900">PM Focus:</strong> {archetype.pmFocus}</p>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-1.5">Key Questions for Feature:</h4>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            {archetype.keyQuestionsForFeature.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>

        {archetype.decisionMapKeywords && archetype.decisionMapKeywords.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Decision Map Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {archetype.decisionMapKeywords.map(keyword => (
                <span key={keyword} className="bg-gray-200 text-gray-700 px-2.5 py-1 text-xs rounded-full font-medium hover:bg-gray-300 transition-colors">{keyword}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          UX Archetypes for Privacy & Compliance
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
          A practical decision-making tool for UX designers and Product Managers, helping to align features with user mindsets in privacy and compliance.
        </p>
      </header>

      <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">How to Use This Tool: Finding Your Archetype</h2>
        {currentQuestionIndex < questions.length ? (
          <div className="text-center">
            {currentQuestion && (
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">{currentQuestion.text}</p>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => currentQuestion && handleAnswer(currentQuestion.archetypes)}
                disabled={!currentQuestion}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 ease-in-out text-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Yes, this applies to the feature"
              >
                Yes, this applies
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-150 ease-in-out text-lg font-medium"
                  aria-label="No, try the next question"
                >
                  No, try next question
                </button>
              ) : (
                 <button
                    onClick={handleFinalNo}
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-150 ease-in-out text-lg font-medium"
                    aria-label="No, this doesn't apply and show results"
                  >
                    No, this doesn't apply
                  </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            {suggestedArchetypes.length > 0 ? (
              <>
                <p className="text-xl text-gray-700 mb-6">
                  Based on your answers, consider these archetypes for your feature:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {suggestedArchetypes.map(archetype => (
                    <div key={archetype.name} className="p-5 border border-blue-200 rounded-lg bg-blue-50 text-left shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-3">
                        {archetype.icon && <archetype.icon size={28} className="text-blue-600 mr-3 flex-shrink-0" />}
                        <h3 className="text-2xl font-semibold text-blue-800">{archetype.name}</h3>
                      </div>
                      <p className="text-gray-700 text-base">{archetype.coreIdentity}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xl text-gray-700 mb-6">
                No specific archetype strongly suggested by this path. Consider your feature's core goals or review the archetypes directly below.
              </p>
            )}
            <button
              onClick={resetDecisionMap}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 ease-in-out text-lg font-medium flex items-center justify-center mx-auto"
              aria-label="Start the decision map over"
            >
              <RefreshCcw size={20} className="mr-2" /> Start Over
            </button>
          </div>
        )}
      </section>

      <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-yellow-900 mb-3 flex items-center">
          <AlertTriangle size={26} className="mr-3 text-yellow-600 flex-shrink-0" /> Why This Matters
        </h2>
        <p className="text-yellow-800 text-lg leading-relaxed">
          Understanding these archetypes directly enhances <strong>consumer trust and product quality</strong>. By designing for the specific needs and mindsets of privacy and compliance professionals, you create internal tools that are more effective, leading to better, more transparent, and more trustworthy experiences for your end-users.
        </p>
      </section>

      <section className="p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg mb-12 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Explore Archetypes</h2>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => setArchetypeViewMode('grid')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 flex items-center
                ${archetypeViewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-300'}`}
              aria-pressed={archetypeViewMode === 'grid'}
              aria-label="Switch to Grid View"
            >
              <LayoutGrid size={18} className="mr-0 sm:mr-2" /> <span className="hidden sm:inline">Grid View</span>
            </button>
            <button
              onClick={() => setArchetypeViewMode('cards')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 flex items-center
                ${archetypeViewMode === 'cards' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-300'}`}
              aria-pressed={archetypeViewMode === 'cards'}
              aria-label="Switch to Cards View"
            >
              <List size={18} className="mr-0 sm:mr-2" /> <span className="hidden sm:inline">Cards View</span>
            </button>
          </div>
        </div>

        {archetypeViewMode === 'grid' ? (
          <div className="bg-white p-0 sm:p-2 md:p-4 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Archetype
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Key Traits
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Goals
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Challenges
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      UX Needs & Key Questions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="bg-blue-50">
                    <td colSpan={5} className="px-4 py-3 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">
                      Privacy Professionals
                    </td>
                  </tr>
                  {archetypesData.filter(a => a.group === "Privacy Professionals").map((archetype, index) => (
                    <tr key={archetype.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70 hover:bg-gray-100 transition-colors duration-150'}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          {archetype.icon && <archetype.icon size={20} className="text-blue-600 mr-2.5 flex-shrink-0" />}
                          {archetype.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[220px]">{archetype.keyTraits}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[220px]">{archetype.goals}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[220px]">{archetype.challenges}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[280px] relative group">
                        <p><strong className="font-medium text-gray-800">Needs:</strong> <span className="font-normal">{archetype.uxNeeds}</span></p>
                        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-md p-3 z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 shadow-xl w-80 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <h4 className="font-bold mb-1.5 text-sm text-gray-100">Key Feature Questions:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {archetype.keyQuestionsForFeature.map((q, i) => <li key={i}>{q}</li>)}
                          </ul>
                        </div>
                        <span className="text-xs text-blue-600 group-hover:underline cursor-pointer mt-1 inline-block">(Hover for Key Questions)</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-green-50">
                    <td colSpan={5} className="px-4 py-3 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                      Compliance Professionals
                    </td>
                  </tr>
                  {archetypesData.filter(a => a.group === "Compliance Professionals").map((archetype, index) => (
                    <tr key={archetype.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70 hover:bg-gray-100 transition-colors duration-150'}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          {archetype.icon && <archetype.icon size={20} className="text-green-600 mr-2.5 flex-shrink-0" />}
                          {archetype.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[220px]">{archetype.keyTraits}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[220px]">{archetype.goals}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[220px]">{archetype.challenges}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 min-w-[280px] relative group">
                         <p><strong className="font-medium text-gray-800">Needs:</strong> <span className="font-normal">{archetype.uxNeeds}</span></p>
                        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-md p-3 z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 shadow-xl w-80 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <h4 className="font-bold mb-1.5 text-sm text-gray-100">Key Feature Questions:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {archetype.keyQuestionsForFeature.map((q, i) => <li key={i}>{q}</li>)}
                          </ul>
                        </div>
                         <span className="text-xs text-blue-600 group-hover:underline cursor-pointer mt-1 inline-block">(Hover for Key Questions)</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypesData.map(archetype => renderArchetypeCard(archetype))}
          </div>
        )}
      </section>

      <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">III. Applying Archetypes to Your Roadmap: Quick Principles</h2>
        <ul className="space-y-5 text-gray-700 leading-relaxed">
          <li className="flex items-start">
            <CheckCircle size={22} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <strong className="font-semibold text-gray-900">Validate:</strong> Continuously refine archetype assumptions through user research to ensure roadmap features address real, evolving needs.
            </div>
          </li>
          <li className="flex items-start">
            <Users size={22} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <strong className="font-semibold text-gray-900">Collaborate:</strong> Foster strong cross-functional collaboration between UX, Product, Legal, and Engineering teams. Host workshops to align on archetype understanding and implications for design.
            </div>
          </li>
          <li className="flex items-start">
            <BarChart3 size={22} className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <strong className="font-semibold text-gray-900">Measure:</strong> Track usage metrics related to key features for each archetype. This helps evaluate the effectiveness of your design decisions and identify areas for improvement.
            </div>
          </li>
          <li className="flex items-start">
            <Zap size={22} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <strong className="font-semibold text-gray-900">Consumer Impact:</strong> Always remember that improving the professional's UX directly enhances the end-consumer's trust, transparency, and overall experience with your brand.
            </div>
          </li>
          <li className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Making Archetypes Part of Your Daily Language:</h3>
            <p>
              Consistent reference to this document during feature refinement, design reviews, and stakeholder discussions will naturally embed these archetypes into your team's vocabulary and decision-making process. Over time, you'll find yourselves instinctively asking, "How does this serve 'The Vigilant Guardian'?" or "Does this simplify things for 'The Pragmatic Implementer'?" This shared understanding will lead to more cohesive, user-centered product development.
            </p>
          </li>
        </ul>
      </section>

      <footer className="text-center mt-16 mb-8 py-6 border-t border-gray-300">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} UX Archetype Tool. Inspired by real-world challenges in privacy and compliance.</p>
      </footer>
    </div>
  );
};

export default App;
