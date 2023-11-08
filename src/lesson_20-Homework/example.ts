// Receiver: the class that performs the actual actions
class Light {
   turnOn() {
      console.log("Light is on");
   }

   turnOff() {
      console.log("Light is off");
   }
}

// Command interface
interface Command {
   execute(): void;
}

// ConcreteCommand: implements the Command interface
class TurnOnLightCommand implements Command {
   private light: Light;

   constructor(light: Light) {
      this.light = light;
   }

   execute() {
      this.light.turnOn();
   }
}

class TurnOffLightCommand implements Command {
   private light: Light;

   constructor(light: Light) {
      this.light = light;
   }

   execute() {
      this.light.turnOff();
   }
}

// Invoker: invokes the commands
class RemoteControl {
   private command: Command | null;

   setCommand(command: Command) {
      this.command = command;
   }

   pressButton() {
      if (this.command) {
         this.command.execute();
      } else {
         console.log("No command is set");
      }
   }
}

// Client code
const light = new Light();
const turnOnCommand = new TurnOnLightCommand(light);
const turnOffCommand = new TurnOffLightCommand(light);

const remote = new RemoteControl();

remote.setCommand(turnOnCommand);
remote.pressButton(); // Turns on the light

remote.setCommand(turnOffCommand);
remote.pressButton(); // Turns off the light
