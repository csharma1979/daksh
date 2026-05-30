"use client";

import { signOut } from "next-auth/react";
import { LogOut, Bell, User as UserIcon } from "lucide-react";

import "./Header.css";

const Header = ({ user }: { user: any }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>Dashboard</h2>
      </div>
      
      <div className="header-right">
        <button className="icon-btn"><Bell size={20} /></button>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user.name || 'Admin'}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <div className="user-avatar">
            <UserIcon size={20} />
          </div>
          <button onClick={() => signOut()} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
