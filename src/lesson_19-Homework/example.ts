// Abstract Product: KitchenAppliance
abstract class KitchenAppliance {
   abstract use(): void;
}

// Concrete Products
class Blender extends KitchenAppliance {
   use() {
      console.log("Blending ingredients");
   }
}

class Microwave extends KitchenAppliance {
   use() {
      console.log("Heating food");
   }
}

// Abstract Factory
abstract class KitchenFactory {
   abstract createBlender(): KitchenAppliance;
   abstract createMicrowave(): KitchenAppliance;
}

// Concrete Factories
class BlenderFactory extends KitchenFactory {
   createBlender(): KitchenAppliance {
      return new Blender();
   }

   createMicrowave(): KitchenAppliance {
      return null;
   }
}

class MicrowaveFactory extends KitchenFactory {
   createBlender(): KitchenAppliance {
      return null;
   }

   createMicrowave(): KitchenAppliance {
      return new Microwave();
   }
}

function useKitchenAppliance(factory: KitchenFactory) {
   const blender = factory.createBlender();
   const microwave = factory.createMicrowave();

   if (blender) {
      blender.use();
   }

   if (microwave) {
      microwave.use();
   }
}

// Example usage
const blenderFactory = new BlenderFactory();
useKitchenAppliance(blenderFactory);

const microwaveFactory = new MicrowaveFactory();
useKitchenAppliance(microwaveFactory);
