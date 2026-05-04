export async function fetchMotivationalQuote(): Promise<string> {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();
    return data.quote ?? 'Foco no que você pode controlar.';
  } catch {
    return 'Cada tarefa concluída é um passo em direção ao sucesso!';
  }
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'trabalho', name: 'Trabalho', icon: '💼' },
  { slug: 'pessoal', name: 'Pessoal', icon: '👤' },
  { slug: 'estudos', name: 'Estudos', icon: '📚' },
  { slug: 'saude', name: 'Saúde', icon: '❤️' },
  { slug: 'financas', name: 'Finanças', icon: '💰' },
  { slug: 'outros', name: 'Outros', icon: '📌' },
];
