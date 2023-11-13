// Компоненты подсистемы
class CPU {
   public freeze(): void {
      console.log("Замораживание ЦП...");
   }

   public jump(position: number): void {
      console.log(`Переход на позицию ${position}`);
   }

   public execute(): void {
      console.log("Выполнение инструкций ЦП...");
   }
}

class Memory {
   public load(position: number, data: string): void {
      console.log(`Загрузка данных на позицию ${position}: ${data}`);
   }
}

class HardDrive {
   public read(lba: number, size: number): string {
      console.log(`Чтение с жесткого диска с LBA ${lba}, размер ${size}`);
      return "Данные с жесткого диска";
   }
}

// Фасад
class ComputerFacade {
   private cpu: CPU;
   private memory: Memory;
   private hardDrive: HardDrive;

   constructor(cpu: CPU, memory: Memory, hardDrive: HardDrive) {
      this.cpu = cpu;
      this.memory = memory;
      this.hardDrive = hardDrive;
   }

   public start(): void {
      this.cpu.freeze();
      this.memory.load(0, "BOOT_ADDRESS");
      this.cpu.jump(0);
      this.cpu.execute();
   }

   public shutDown(): void {
      console.log("Выключение компьютера...");
   }

   public readData(): string {
      return this.hardDrive.read(100, 1024);
   }
}

// Клиентский код
const cpu = new CPU();
const memory = new Memory();
const hardDrive = new HardDrive();

const computerFacade = new ComputerFacade(cpu, memory, hardDrive);

// Использование фасада для запуска и выключения компьютера
computerFacade.start();
computerFacade.shutDown();

// Использование фасада для чтения данных с жесткого диска
const data = computerFacade.readData();
console.log(`Прочитанные данные: ${data}`);
