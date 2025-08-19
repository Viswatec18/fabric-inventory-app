import React, { useState } from 'react';
import Icon from '../AppIcon';

const Support = () => {
  const [activeSection, setActiveSection] = useState('contact');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const supportSections = [
    { id: 'contact', label: 'Contact', icon: 'Phone' },
    { id: 'docs', label: 'Documentation', icon: 'BookOpen' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'tickets', label: 'Support Tickets', icon: 'MessageSquare' }
  ];

  const faqItems = [
    {
      question: 'How do I place a bulk order?',
      answer: 'Navigate to the fabric catalog, select your desired fabrics, and add them to cart. For orders over 1000 yards, contact our sales team for special pricing.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and PayPal. For large orders, we also offer net payment terms for verified businesses.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight delivery are also available.'
    },
    {
      question: 'Can I get fabric samples?',
      answer: 'Yes! We offer free samples for up to 5 fabrics per request. Samples are typically shipped within 24 hours.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log('Support ticket submitted:', ticketForm);
    // Reset form
    setTicketForm({ subject: '', description: '', priority: 'medium' });
    alert('Support ticket submitted successfully!');
  };

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">Get in Touch</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={16} className="text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Email Support</div>
              <div className="text-sm text-gray-600">support@fabrichub.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Phone" size={16} className="text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Phone Support</div>
              <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={16} className="text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Address</div>
              <div className="text-sm text-gray-600">123 Textile Ave, Fashion District, NY 10001</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={16} className="text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Business Hours</div>
              <div className="text-sm text-gray-600">Mon-Fri 9AM-6PM EST</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="MessageCircle" size={16} className="text-green-600" />
          <span className="font-medium text-green-900">Live Chat Available</span>
        </div>
        <p className="text-sm text-green-700 mb-3">
          Chat with our support team for immediate assistance
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Start Live Chat
        </button>
      </div>
    </div>
  );

  const renderDocsSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <Icon name="BookOpen" size={20} className="text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
          <p className="text-sm text-gray-600 mb-3">Learn how to navigate and use FabricHub</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Read Guide →
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <Icon name="Package" size={20} className="text-green-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-2">Ordering Guide</h3>
          <p className="text-sm text-gray-600 mb-3">Step-by-step ordering process</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Tutorial →
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <Icon name="CreditCard" size={20} className="text-purple-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-2">Payment Methods</h3>
          <p className="text-sm text-gray-600 mb-3">Accepted payment options and terms</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <Icon name="Truck" size={20} className="text-orange-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-2">Shipping Info</h3>
          <p className="text-sm text-gray-600 mb-3">Delivery options and tracking</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );

  const renderFaqSection = () => (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      ))}
    </div>
  );

  const renderTicketsSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Submit Support Ticket</h3>
        <form onSubmit={handleTicketSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={ticketForm.subject}
              onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of your issue"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={ticketForm.priority}
              onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={ticketForm.description}
              onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              placeholder="Detailed description of your issue or question"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Submit Ticket
          </button>
        </form>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Recent Tickets</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">#TK-001: Order status inquiry</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Resolved</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">#TK-002: Payment processing issue</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Support Center</h2>
        <div className="flex flex-wrap gap-2">
          {supportSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon name={section.icon} size={12} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        {activeSection === 'contact' && renderContactSection()}
        {activeSection === 'docs' && renderDocsSection()}
        {activeSection === 'faq' && renderFaqSection()}
        {activeSection === 'tickets' && renderTicketsSection()}
      </div>
    </div>
  );
};

export default Support;