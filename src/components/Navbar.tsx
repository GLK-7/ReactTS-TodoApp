import { ListChecks } from '@phosphor-icons/react';

const Navbar = () => {
  return (
    <div className="flex gap-2 bg-neutral-800 h-20 items-center shadow-md justify-center w-full text-white">
      <h2 className="font-bold text-2xl text-white">React TS - Todo List</h2>
      <ListChecks size={36} weight="bold" />
    </div>
  );
};

export default Navbar;
