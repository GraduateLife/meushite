export function cleanMarkdown(content: string) {
  return (
    content
      // Remove code block syntax
      .replace(/```[\s\S]*?```/g, function (match) {
        // Keep the code content, remove only the backticks and language specification
        return match.replace(/```\w*\n?|\n?```/g, '');
      })
      // Remove headers (##, ###, etc)
      .replace(/#{1,6}\s/g, '')
      // Remove emphasis (_text_, *text*)
      .replace(/[_*](.*?)[_*]/g, '$1')
      // Remove bullet points
      .replace(/^\s*-\s/gm, '')
      // Keep alt text but remove Markdown image tags ![alt](url)
      .replace(/!?\[(.*?)\]\(.*?\)/g, '$1')
      // Keep alt text but remove HTML image tags <img src="..." alt="..." />
      .replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, '$1')
      // Remove extra whitespace
      .replace(/\n\s*\n/g, '\n')
      .trim()
  );
}
