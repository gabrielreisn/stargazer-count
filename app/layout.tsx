'use client';
import { Inter } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from '@/clients/graphql';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
