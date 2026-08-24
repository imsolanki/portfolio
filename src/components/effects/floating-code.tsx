'use client';

import { motion } from 'framer-motion';

const snippets = [
  {
    code: `@RestController\n@RequestMapping("/api/v1/auth")\npublic class AuthController {\n    @PostMapping("/login")\n    public ResponseEntity<?> login() { ... }\n}`,
    top: '15%',
    left: '10%',
    delay: 0,
    duration: 15,
    rotate: -5
  },
  {
    code: `spring:\n  kafka:\n    producer:\n      bootstrap-servers: localhost:9092\n      key-serializer: StringSerializer\n      value-serializer: JsonSerializer`,
    top: '60%',
    left: '5%',
    delay: 2,
    duration: 18,
    rotate: 3
  },
  {
    code: `version: '3.8'\nservices:\n  postgres:\n    image: postgres:14\n    environment:\n      POSTGRES_DB: app_db`,
    top: '25%',
    left: '75%',
    delay: 1,
    duration: 16,
    rotate: 8
  },
  {
    code: `SELECT user_id, COUNT(*) \nFROM user_events \nWHERE created_at >= NOW() - INTERVAL '1 day' \nGROUP BY user_id;`,
    top: '70%',
    left: '80%',
    delay: 3,
    duration: 20,
    rotate: -6
  },
  {
    code: `def generate_response(prompt):\n    response = openai.ChatCompletion.create(\n        model="gpt-4",\n        messages=[{"role": "user", "content": prompt}]\n    )\n    return response.choices[0].message.content`,
    top: '85%',
    left: '40%',
    delay: 4,
    duration: 17,
    rotate: 2
  }
];

export function FloatingCode() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden hidden md:block">
      {snippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          className="absolute opacity-[0.08] text-text-muted font-mono text-xs whitespace-pre p-4 rounded-lg bg-surface backdrop-blur-sm border border-surface-border"
          style={{
            top: snippet.top,
            left: snippet.left,
            rotate: snippet.rotate,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: snippet.duration,
            repeat: Infinity,
            delay: snippet.delay,
            ease: "easeInOut",
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  );
}
