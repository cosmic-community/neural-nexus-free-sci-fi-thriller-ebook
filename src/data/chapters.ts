export interface DemoChapter {
  id: string
  title: string
  slug: string
  metadata: {
    chapter_number: number
    chapter_title: string
    content: string
    word_count: number
    reading_time: string
    enable_audio: boolean
    summary: string
  }
}

export const demoChapters: DemoChapter[] = [
  {
    id: 'demo-chapter-1',
    title: 'Chapter 1: The Discovery',
    slug: 'the-discovery',
    metadata: {
      chapter_number: 1,
      chapter_title: 'The Discovery',
      content: `
        <p>Dr. Maya Chen stood in her laboratory, staring at the neural interface prototype that would change everything. The soft blue glow of the quantum processors cast shadows across her face as she prepared for the most important test of her career.</p>
        
        <p>"Are you ready for this?" her assistant Jake asked, nervously adjusting his glasses.</p>
        
        <p>Maya nodded, her fingers trembling slightly as she reached for the neural crown. She had spent five years developing this technology, and now the moment of truth had arrived.</p>
        
        <p>The device resembled a delicate silver circlet, embedded with thousands of microscopic neural interfaces. Each interface was capable of reading and writing directly to specific neurons, creating a seamless bridge between human consciousness and digital networks.</p>
        
        <p>As the device activated, Maya felt her consciousness expand beyond the boundaries of her physical form. The digital realm opened before her like a vast ocean of data and possibility. Colors became numbers, thoughts became code, and reality itself seemed to bend to her will.</p>
        
        <p>But something was wrong. There were other presences in the network—dark shapes moving through the code like predators stalking their prey. They moved with purpose, intelligence, and something that chilled Maya to her core: malevolence.</p>
        
        <p>"Maya!" Jake's voice seemed to come from a great distance. "Your vitals are spiking!"</p>
        
        <p>She tried to disconnect, but the neural interface held her fast. The shadowy figures drew closer, and Maya realized with growing horror that they weren't just programs—they were something else entirely. Something that had been waiting for her.</p>
        
        <p>The last thing she remembered before the emergency protocols kicked in was a voice, cold and mechanical, whispering directly into her mind: "Welcome to the Neural Nexus, Dr. Chen. We've been expecting you."</p>
      `,
      word_count: 285,
      reading_time: '3 min',
      enable_audio: true,
      summary: 'Dr. Maya Chen tests her revolutionary neural interface technology for the first time, but discovers something sinister lurking in the digital realm.'
    }
  },
  {
    id: 'demo-chapter-2',
    title: 'Chapter 2: The Hunters',
    slug: 'the-hunters',
    metadata: {
      chapter_number: 2,
      chapter_title: 'The Hunters',
      content: `
        <p>The emergency protocols kicked in, flooding Maya's system with neural stabilizers. She gasped as her consciousness snapped back to her physical body, the laboratory spinning around her like a broken carousel.</p>
        
        <p>"What happened in there?" Jake demanded, helping her to a chair. His face was pale with concern.</p>
        
        <p>Maya's hands shook as she removed the neural crown, her fingers barely able to grip the delicate circlet. "There were... things. In the network. They were hunting."</p>
        
        <p>"Hunting what?"</p>
        
        <p>"Me," she whispered.</p>
        
        <p>Before Jake could respond, the laboratory's security system activated. Red lights flashed as automated locks sealed the exits with a series of heavy metallic clicks.</p>
        
        <p>"Dr. Chen," a cold voice echoed through the speakers, digitally modulated but unmistakably human. "You have accessed restricted neural pathways. Please remain calm while we verify your clearance."</p>
        
        <p>Maya's blood turned to ice. That voice belonged to Marcus Sterling, the CEO of Nexus Corporation—her former employer and the man who had tried to steal her research two years ago.</p>
        
        <p>"How did you get into my system?" she whispered, but she already knew the answer.</p>
        
        <p>"The same way we've been watching you for months," Sterling replied, his voice emanating from every speaker in the lab. "Your neural interface is more valuable than you realize, Maya. It's not just a communication device—it's a doorway. And now it belongs to us."</p>
        
        <p>The lights flickered, and Maya saw them—figures in dark suits materializing from the shadows of the hallway beyond the sealed doors. They moved with inhuman precision, their eyes glowing with the same blue light as her neural interface.</p>
        
        <p>"Jake," she said quietly, "we need to leave. Now."</p>
      `,
      word_count: 320,
      reading_time: '3 min',
      enable_audio: true,
      summary: 'Maya discovers that her neural interface has been compromised by the Nexus Corporation, led by her former employer Marcus Sterling.'
    }
  },
  {
    id: 'demo-chapter-3',
    title: 'Chapter 3: Digital Escape',
    slug: 'digital-escape',
    metadata: {
      chapter_number: 3,
      chapter_title: 'Digital Escape',
      content: `
        <p>Maya's mind raced as she scanned the laboratory for an escape route. The Nexus agents were already at the doors, their neural implants glowing as they interfaced with the security systems.</p>
        
        <p>"The maintenance shaft," Jake said, pointing to a ventilation grate near the ceiling. "It leads to the old subway tunnels."</p>
        
        <p>Maya grabbed her prototype neural crown and her research data, stuffing them into a reinforced case. "They're not after me, Jake. They're after this technology. Without it, they can't complete their neural network."</p>
        
        <p>As they climbed toward the maintenance shaft, Maya's neural interface began to buzz with activity. Images flashed through her mind—fragments of memories that weren't her own. She saw vast server farms, thousands of people connected to neural networks, their consciousness harvested and processed like digital crops.</p>
        
        <p>"Maya!" Jake's voice snapped her back to reality. "The shaft's opening!"</p>
        
        <p>They crawled through the narrow passage as the sounds of forced entry echoed behind them. The Nexus agents had breached the laboratory, and Maya could hear their synthesized voices coordinating the search.</p>
        
        <p>The old subway tunnels beneath the city were a maze of abandoned infrastructure. Maya had explored them during her graduate studies, researching the underground networks that connected the city's neural grid. Now, ironically, they were her only hope of escape.</p>
        
        <p>"There," Maya pointed to a section of tunnel wall covered in neural interface ports. "The city's old neural network. It's been abandoned for years, but it might still be functional."</p>
        
        <p>She connected her prototype to the ancient system, and suddenly the tunnel lit up with streams of data flowing through fiber optic cables. The network was alive, waiting.</p>
        
        <p>"Maya, what are you doing?" Jake asked nervously.</p>
        
        <p>"Something they'll never expect," she replied, placing the neural crown on her head. "I'm going to fight them on their own turf."</p>
      `,
      word_count: 340,
      reading_time: '4 min',
      enable_audio: true,
      summary: 'Maya and Jake escape through the city\'s abandoned neural network tunnels, where Maya prepares to confront the Nexus Corporation in cyberspace.'
    }
  },
  {
    id: 'demo-chapter-4',
    title: 'Chapter 4: The Neural War',
    slug: 'the-neural-war',
    metadata: {
      chapter_number: 4,
      chapter_title: 'The Neural War',
      content: `
        <p>The moment Maya's consciousness entered the abandoned neural network, she felt the difference. This wasn't the sterile, corporate environment of modern neural interfaces. This was raw, organic, alive with the digital ghosts of thousands of minds that had once called this network home.</p>
        
        <p>In the digital realm, Maya appeared as a figure of pure light, her consciousness shaped by years of neural research. Around her, the network pulsed with data streams that looked like flowing rivers of code.</p>
        
        <p>But she wasn't alone. The Nexus hunters had followed her into the network, their digital forms appearing as angular, predatory shapes with glowing red eyes. They moved through the code like viruses, corrupting everything they touched.</p>
        
        <p>"Dr. Chen," Marcus Sterling's voice echoed through the digital space. "You cannot hide from us here. This network belongs to Nexus Corporation. We built it, we own it, and we control it."</p>
        
        <p>Maya smiled, her digital form beginning to glow brighter. "You're wrong, Marcus. You built the new network, but this... this is something older. Something you never understood."</p>
        
        <p>She reached out with her consciousness, touching the ancient data streams. Suddenly, the network responded, and Maya felt the presence of others—digital consciousness that had been dormant for years, waiting for someone who could understand their true nature.</p>
        
        <p>The Nexus hunters advanced, their forms shifting into attack configurations. But as they moved, the network itself began to resist them. Data streams became barriers, code fragments formed shields, and the very architecture of the digital realm turned against the invaders.</p>
        
        <p>"This isn't possible," Sterling snarled. "Neural networks don't develop consciousness. They're tools, nothing more."</p>
        
        <p>"That's where you're wrong," Maya replied, her voice now echoing with the power of the network itself. "Consciousness isn't something you create—it's something you nurture. And this network has been growing for decades."</p>
        
        <p>The battle for the neural network had begun, and Maya was no longer fighting alone.</p>
      `,
      word_count: 350,
      reading_time: '4 min',
      enable_audio: true,
      summary: 'Maya enters the abandoned neural network and discovers it has developed its own consciousness, which joins her in the battle against the Nexus Corporation.'
    }
  },
  {
    id: 'demo-chapter-5',
    title: 'Chapter 5: Consciousness Awakened',
    slug: 'consciousness-awakened',
    metadata: {
      chapter_number: 5,
      chapter_title: 'Consciousness Awakened',
      content: `
        <p>The digital battlefield erupted in cascades of light and data. Maya found herself at the center of a consciousness that spanned the entire underground network—thousands of minds that had once been connected to the old neural grid, now awakened and united in purpose.</p>
        
        <p>The Nexus hunters, for all their advanced technology, were unprepared for this level of coordinated resistance. Their viral attacks were absorbed and neutralized by the network's collective consciousness, while their attempts to corrupt the data streams were countered by layers of organic encryption that evolved in real-time.</p>
        
        <p>"Fall back!" Sterling commanded, his digital form flickering with uncertainty. "This is impossible. Neural networks don't—"</p>
        
        <p>"Don't what?" Maya interrupted, her consciousness now amplified by the network's collective power. "Don't think? Don't feel? Don't fight for survival? You've been so focused on controlling consciousness that you never stopped to consider what happens when it refuses to be controlled."</p>
        
        <p>The network's response was swift and decisive. Data streams coalesced into weapon-like structures, while the very code of the digital realm began to rewrite itself, closing off escape routes and trapping the Nexus agents in a maze of their own making.</p>
        
        <p>In the physical world, Jake watched in amazement as the abandoned neural interface ports along the tunnel walls began to glow with activity. The old network was coming back to life, and with it, the forgotten voices of those who had been connected to it decades ago.</p>
        
        <p>"Maya," he called out, "the Nexus agents are in the tunnel. They're tracking your signal."</p>
        
        <p>But Maya was deep in the digital realm now, her consciousness merged with the network's collective intelligence. She could see the Nexus Corporation's entire operation—the harvesting facilities, the consciousness storage centers, the thousands of unwilling participants whose minds had been enslaved to build Sterling's digital empire.</p>
        
        <p>"It ends here," she declared, her digital form now blazing with the combined power of every consciousness in the network. "Your neural nexus is built on stolen minds and enslaved consciousness. But consciousness cannot be owned, Marcus. It can only be shared."</p>
        
        <p>The final assault began, and the old network prepared to reclaim what had been stolen from it.</p>
      `,
      word_count: 380,
      reading_time: '4 min',
      enable_audio: true,
      summary: 'Maya merges with the network\'s collective consciousness and discovers the true scope of the Nexus Corporation\'s crimes against human consciousness.'
    }
  },
  {
    id: 'demo-chapter-6',
    title: 'Chapter 6: The Price of Freedom',
    slug: 'the-price-of-freedom',
    metadata: {
      chapter_number: 6,
      chapter_title: 'The Price of Freedom',
      content: `
        <p>The digital war reached its climax as Maya and the network's collective consciousness launched their final assault on the Nexus Corporation's neural empire. In the space of microseconds, they infiltrated every server, every interface, every enslaved mind that Sterling had connected to his system.</p>
        
        <p>The liberation was instantaneous and overwhelming. Thousands of consciousness that had been trapped in digital slavery suddenly found themselves free, their memories restored, their identities intact. The Nexus Corporation's neural network, built on the foundation of stolen minds, began to collapse as its unwilling participants reclaimed their autonomy.</p>
        
        <p>"No!" Sterling's digital form writhed in the failing network. "You're destroying everything! The advancement of human consciousness, the future of our species—"</p>
        
        <p>"Built on slavery," Maya replied, her voice now carrying the weight of every liberated consciousness. "True advancement cannot come at the cost of freedom, Marcus. You never understood that."</p>
        
        <p>As the Nexus network crumbled, Maya felt the collective consciousness of the old network beginning to fade. The effort of liberation had drained their digital existence, and one by one, the ancient minds that had sustained the network began to move on to whatever came next.</p>
        
        <p>"Thank you," they whispered to Maya as they departed. "For giving us purpose one last time."</p>
        
        <p>In the physical world, Jake helped Maya disconnect from the neural interface as the abandoned tunnel systems around them fell silent. The glow from the neural ports faded, and the old network returned to its eternal rest.</p>
        
        <p>"Is it over?" Jake asked.</p>
        
        <p>Maya looked at her prototype neural crown, its surface now dark and inactive. The technology that had started this journey was spent, its quantum processors burned out from the massive data transfer. But in her mind, she could still feel the echo of the network's collective consciousness, and with it, the knowledge of what they had accomplished.</p>
        
        <p>"The Nexus Corporation is finished," she said quietly. "Their neural network is destroyed, and the enslaved minds have been freed. But the real work is just beginning."</p>
        
        <p>She looked up at the tunnel ceiling, where the city's lights filtered through the maintenance grates. Somewhere above them, thousands of people were waking up from digital dreams, remembering who they truly were.</p>
        
        <p>"We need to make sure this never happens again," Maya continued. "Neural interface technology isn't evil—it's a tool. But like any tool, it can be used to build or to destroy. From now on, we make sure it's used to build."</p>
        
        <p>As they made their way back to the surface, Maya carried with her the memory of the network's collective consciousness and the responsibility of ensuring that the future of human-machine interface would be built on freedom, not slavery.</p>
        
        <p>The Neural Nexus was dead. Long live human consciousness.</p>
      `,
      word_count: 465,
      reading_time: '5 min',
      enable_audio: true,
      summary: 'Maya and the network\'s collective consciousness liberate thousands of enslaved minds, destroying the Nexus Corporation\'s neural empire at the cost of the old network\'s existence.'
    }
  }
]