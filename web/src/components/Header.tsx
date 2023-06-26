import * as Dialog from "@radix-ui/react-dialog";
import LogoSvg from "../assets/logo.svg";
import { Plus, X } from "phosphor-react";
import NewHabitForm from "./NewHabitForm";

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={LogoSvg} alt="habits" />

      <Dialog.Root>
        <Dialog.Trigger
          className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
          type="button"
        >
          <Plus size={20} className="text-violet-500" />
          Novo Habito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen fixed bg-black/80 inset-0" />
          <Dialog.Content className="absolute p-10 w-full bg-zinc-900 rounded-2xl  max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 text-zinc-400 top-6 hover:text-zinc-200">
              <X size={24} aria-label="fechar modal" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl leading-tight text-white font-extrabold">
              Criar Habito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
