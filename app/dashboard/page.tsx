"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Temporarily removed auth check - always redirect to admin dashboard
    router.push('/dashboard/admin');
  }, [router]);

  // Show loading while determining redirect
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-pink-500" />
        {/* <p className="text-gray-600">Redirecting to dashboard...</p> */}
      </div>
    </div>
  );
} 