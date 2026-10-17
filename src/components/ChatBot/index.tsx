import React, { FormEvent, useEffect, useRef } from 'react';
import useChatBot from './useChatBot';
import styles from './ChatBot.module.css';

const starterPrompts = [
  'How do I join testnet?',
  'What is the Safrochain RPC endpoint?',
  'Show me the CLI command for sending tokens.',
  'Where is the chain registry entry?',
];

function renderMessageText(text: string) {
  return text.split('\n').map((block, index) => (
    <p key={index} className={styles.bubbleText}>
      {block}
    </p>
  ));
}

export default function ChatBot(): React.JSX.Element {
  const { messages, inputValue, setInputValue, sendMessage, resetChat, isLoading } = useChatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue.trim());
    }
  };

  return (
    <div className={styles.root}>
      {/* Header épuré et professionnel */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.badgeContainer}>
            <span className={styles.onlineBadge}></span>
            <span className={styles.badgeText}>Safrochain AI Assistant</span>
          </div>
          <h2 className={styles.title}>Ask me</h2>
          <p className={styles.subtitle}>
            Ask the bot to locate the right documentation page, summarize network access,
            and point you to the correct CLI or node guide.
          </p>
        </div>
        <div className={styles.topControls}>
          <button className={styles.secondaryButton} type="button" onClick={resetChat}>
            New chat
          </button>
          <a className={styles.closeLink} href="/">
            Close
          </a>
        </div>
      </div>

      {/* Panneau principal avec arrière-plan adaptatif */}
      <div className={styles.panel}>
        <div className={styles.messages}>
          {messages.map((message, index) => {
            const isUser = message.role === 'user';
            const messageClass = isUser ? styles.messageUser : styles.messageAssistant;
            
            return (
              <div key={index} className={`${styles.message} ${messageClass}`}>
                <div className={styles.messageHeader}>
                  <span className={styles.senderName}>
                    {isUser ? 'You' : 'Safrochain Bot'}
                  </span>
                </div>
                
                <div className={styles.bubble}>
                  {renderMessageText(message.text)}
                </div>

                {message.sources?.length ? (
                  <div className={styles.sourcesContainer}>
                    <div className={styles.sources}>
                      {message.sources.map(source => (
                        <div key={source.path} className={styles.sourceItem}>
                          <div className={styles.sourceTitle}>{source.title}</div>
                          <div className={styles.sourceExcerpt}>{source.excerpt}</div>
                          <a className={styles.sourceLink} href={source.path}>
                            {source.path}
                          </a>
                        </div>
                      ))}
                    </div>
                    {message.choices && message.choices.length ? (
                      <div className={styles.choicesContainer}>
                        {message.choices.map(choice => (
                          <button
                            key={choice}
                            type="button"
                            className={styles.choiceButton}
                            onClick={() => !isLoading && sendMessage(choice)}
                            disabled={isLoading}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
          
          {isLoading && (
            <div className={`${styles.message} ${styles.messageAssistant}`}>
              <div className={styles.messageHeader}>
                <span className={styles.senderName}>Safrochain Bot</span>
              </div>
              <div className={`${styles.bubble} ${styles.loadingBubble}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Saisie et suggestions */}
        <div className={styles.bottomControls}>
          <form className={styles.formRow} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              aria-label="Type your question for Safrochain docs"
              placeholder="Ask about testnet endpoints, node setup, or CLI commands..."
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
            />
            <button className={styles.button} type="submit" disabled={!inputValue.trim() || isLoading}>
              Send
            </button>
          </form>

          <div className={styles.suggestions}>
            {starterPrompts.map(prompt => (
              <button
                key={prompt}
                type="button"
                className={styles.prompt}
                onClick={() => !isLoading && sendMessage(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}