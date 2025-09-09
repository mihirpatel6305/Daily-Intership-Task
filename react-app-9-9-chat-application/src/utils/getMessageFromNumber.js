function getMessageFromNumber(number) {
  const messages = [
    "Hello! Good morning",
    "How are you today?",
    "You have a new notification!",
    "Check your tasks for today",
    "Someone liked your post",
    "Don't forget your meeting",
    "Have a great day!",
    "New message received",
    "Time to take a break!",
    "You have an upcoming event",
    "Remember to drink water",
    "Your profile was updated",
    "You earned a new badge",
    "Don't forget to exercise",
    "Meeting starts in 30 minutes",
    "A friend sent you a message",
    "Check out the latest news",
    "Your download is complete",
    "System maintenance at midnight",
    "Have you checked your emails?",
  ];

  const num = parseInt(number, 10);
  const index = num % messages?.length;
  return messages[index];
}

export default getMessageFromNumber;
