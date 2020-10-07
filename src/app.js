import Engine from './Graphics/Screen';
import VisualArray from './Struct/Array';

class App extends Engine{
    static onCreate() {
        this.array = new VisualArray([20, 39, 11, 50]);
        this.run = true;
    }

    static onUpdate() {
        this.array.render(this.ctx);
    }
}

App.init();

