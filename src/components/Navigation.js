import React from 'react';

const Navigation = () => {

  const navItems = [{ title: "Home", route: "/home", }, { title: "Assign Curriculum", route: "/assign-curriculum", }]
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 h-screen">
        Navigation
      </div>

      {/* Main Content */}
      <div className="w-3/4 px-4">
        <ul>
          {navItems.map((e) => (<li><a href={e.route}>{e.title}</a></li>))}
        </ul>
      </div>
    </div>
  );
}

export function NavigationWrapper({ Child }) {
  return (
    <div className="container">
      <div className="flex">
        {/* Navigation Side Pane */}
        <div className="w-1/4 bg-gray-200 h-screen">
          <Navigation />
        </div>
        <div className="w-3/4 px-4">
          {Child}
        </div>
      </div>
    </div>
  );
}
export default Navigation;
