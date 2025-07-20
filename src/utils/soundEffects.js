// Sound Effects Utility for WoW-style Quest App
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Ensure audio context is resumed (required for user interaction)
  async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Generate a satisfying checkbox check sound
  playCheckboxCheck() {
    if (!this.audioContext) return;
    
    this.resumeAudioContext().then(() => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Create a pleasant "tick" sound
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
      
      oscillator.type = 'sine';
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.15);
    });
  }

  // Generate a checkbox uncheck sound (lower pitch)
  playCheckboxUncheck() {
    if (!this.audioContext) return;
    
    this.resumeAudioContext().then(() => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Create a softer "untick" sound
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.12);
      
      oscillator.type = 'sine';
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.12);
    });
  }

  // Generate a WoW-style quest completion sound
  playQuestComplete() {
    if (!this.audioContext) return;
    
    this.resumeAudioContext().then(() => {
      // Create a triumphant chord progression
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)
      
      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
        
        oscillator.type = 'sine';
        oscillator.start(this.audioContext.currentTime + index * 0.1);
        oscillator.stop(this.audioContext.currentTime + 0.8);
      });

      // Add a bell-like overtone
      setTimeout(() => {
        const bellOsc = this.audioContext.createOscillator();
        const bellGain = this.audioContext.createGain();
        
        bellOsc.connect(bellGain);
        bellGain.connect(this.audioContext.destination);
        
        bellOsc.frequency.setValueAtTime(1046.5, this.audioContext.currentTime); // C6
        bellGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        bellGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        bellOsc.type = 'sine';
        bellOsc.start(this.audioContext.currentTime);
        bellOsc.stop(this.audioContext.currentTime + 0.5);
      }, 200);
    });
  }

// Generate an iPhone keyboard-style typing click
playTypingSound() {
    if (!this.audioContext) return;
  
    this.resumeAudioContext().then(() => {
      const ctx = this.audioContext;
  
      // Oscillator for soft tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
  
      // Noise burst for tap texture
      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
      }
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
  
      // Connect nodes
      osc.connect(gain);
      gain.connect(ctx.destination);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
  
      // Oscillator settings (soft rounded tone)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1500, ctx.currentTime); // Slightly lower pitch
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  
      // Noise settings (quick percussive burst)
      noiseGain.gain.setValueAtTime(0.02, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
  
      // Start and stop
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.02);
    });
  }
  

// Generate a satisfying button click sound
playButtonClick() {
    if (!this.audioContext) return;
  
    this.resumeAudioContext().then(() => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const noise = this.audioContext.createBufferSource();
      const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.03, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
  
      // Fill buffer with random noise (white noise)
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      noise.buffer = buffer;
  
      const noiseGain = this.audioContext.createGain();
      noise.connect(noiseGain);
      noiseGain.connect(this.audioContext.destination);
  
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
  
      // Softer button click frequency & envelope
      oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
  
      oscillator.type = 'square';
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.08);
  
      // Add slight noise burst to simulate tactile "thock"
      noiseGain.gain.setValueAtTime(0.015, this.audioContext.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.02);
      noise.start(this.audioContext.currentTime);
      noise.stop(this.audioContext.currentTime + 0.03);
    });
  }
  

  // Generate a hover sound for buttons
  playButtonHover() {
    if (!this.audioContext) return;
    
    this.resumeAudioContext().then(() => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Create a subtle hover sound
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);
      
      oscillator.type = 'sine';
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.08);
    });
  }
}

// Create a singleton instance
const soundEffects = new SoundEffects();

export default soundEffects;