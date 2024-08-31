'use client';

import React from 'react';
import { FaTwitter, FaInstagram, FaReddit, FaYoutube, FaLinkedin, FaDev, FaProductHunt, FaTwitch, FaPinterest, FaMedium, FaTiktok, FaBehance, FaDribbble, FaSpotify, FaApple, FaCodepen, FaGoodreads } from 'react-icons/fa';
import { IconType } from 'react-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ProfileCardProps = {
  username: string;
  textStyle?: { size: string; weight: string };
  color?: string;
  imageUrl?: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ username, textStyle, color, imageUrl }) => (
  <div className={`p-4 rounded shadow ${color || 'bg-neutral-700'} text-neutral-900 dark:text-neutral-100`}>
    <h2 style={{ fontSize: textStyle?.size, fontWeight: textStyle?.weight }} className="font-bold mb-2">
      {username}&apos;s Profile
    </h2>
    {imageUrl && <img src={imageUrl} alt="Profile" className="rounded-full w-24 h-24 mt-2" />}
  </div>
);

export const GitHubStatsCard: React.FC<{ username: string }> = ({ username }) => (
  <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded shadow">
    <h2 className="text-lg font-bold">GitHub Stats for {username}</h2>
    <img
      src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical`}
      alt="GitHub Stats"
      className="mt-2"
    />
  </div>
);

export const CustomTextCard: React.FC<{ text: string; textStyle?: { size: string; weight: string }; color?: string }> = ({
  text,
  textStyle,
  color,
}) => (
  <div className={`p-4 ${color || 'bg-neutral-700'} text-neutral-900 dark:text-neutral-100 rounded shadow`}>
    <p style={{ fontSize: textStyle?.size, fontWeight: textStyle?.weight }} className="leading-relaxed">
      {text}
    </p>
  </div>
);

export const ViewCounterCard: React.FC<{ count: number; label: string; color?: string }> = ({ count, label, color }) => (
  <div className={`p-4 rounded shadow ${color || 'bg-neutral-700'} text-neutral-900 dark:text-neutral-100`}>
    <h2 className="text-lg font-bold">{label}</h2>
    <p className="text-2xl font-extrabold">{count.toLocaleString()}</p>
  </div>
);

export const SocialMediaCard: React.FC<{ links: { platform: string; url: string; icon: IconType }[]; color?: string }> = ({ links, color }) => (
  <div className={`p-4 rounded shadow ${color || 'bg-neutral-700'} text-neutral-900 dark:text-neutral-100`}>
    <h2 className="text-lg font-bold mb-2">Social Media</h2>
    <div className="flex space-x-3">
      {links.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xl hover:opacity-75 transition">
          <link.icon />
        </a>
      ))}
    </div>
  </div>
);

export const CustomLinkCard: React.FC<{ label: string; url: string; icon: IconType; color?: string }> = ({ label, url, icon: Icon, color }) => (
  <div className={`p-4 rounded shadow ${color || 'bg-neutral-700'} text-neutral-900 dark:text-neutral-100`}>
    <h2 className="text-lg font-bold mb-2">{label}</h2>
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:opacity-75 transition">
      <Icon size={20} />
      <span>{url}</span>
    </a>
  </div>
);

export const MarkdownCard: React.FC<{ markdown: string; color?: string }> = ({ markdown, color }) => (
  <div className={`p-4 ${color || 'bg-neutral-700'} text-neutral-900 dark:text-neutral-100 rounded shadow`}>
    <ReactMarkdown className="prose dark:prose-invert" children={markdown} remarkPlugins={[remarkGfm]} />
  </div>
);

export const TwitterCard: React.FC<{ username: string }> = ({ username }) => (
  <CustomLinkCard label="Twitter" url={`https://twitter.com/${username}`} icon={FaTwitter} />
);

export const InstagramCard: React.FC<{ username: string }> = ({ username }) => (
  <CustomLinkCard label="Instagram" url={`https://instagram.com/${username}`} icon={FaInstagram} />
);

export const RedditCard: React.FC<{ username: string }> = ({ username }) => (
  <CustomLinkCard label="Reddit" url={`https://reddit.com/user/${username}`} icon={FaReddit} />
);

// Continue defining other cards...
// You can create components like YouTubeCard, LinkedInCard, DevToCard, etc., using the same approach.

export const ImageCard: React.FC<{ imageUrl: string; caption?: string }> = ({ imageUrl, caption }) => (
  <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded shadow">
    <img src={imageUrl} alt="Custom" className="rounded mb-2" />
    {caption && <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">{caption}</p>}
  </div>
);
