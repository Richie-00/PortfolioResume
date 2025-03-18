import { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface HireProps {
  isOpen: boolean;
  onClose: () => void;
}

function Hire({ isOpen, onClose }: HireProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | null }>({
    message: '',
    type: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
      setAlert({ message: 'Failed to send message. Please check Your Connection And Try Again.', type: 'error' });
      setIsLoading(false);
      return;
    }

    emailjs
      .send(serviceId, templateId, formData as unknown as Record<string, unknown>, publicKey)
      .then((response) => {
        if (response.status === 200) {
          setAlert({ message: 'Message sent successfully!', type: 'success' });
          setFormData({ name: '', email: '', company: '', message: '' });
          setTimeout(() => {
            setAlert({ message: '', type: null });
            onClose();
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setAlert({ message: 'Something went wrong. Please try again.', type: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-md z-50">
      <div ref={formRef} className="p-4 m-2 rounded-2xl bg-black text-white w-full max-w-md relative">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Hire Me</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">X</button>
          
          {alert.message && (
            <div className={`rounded-md p-3 mb-4 text-center ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}> 
              {alert.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white focus:border-indigo-500 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hire;
