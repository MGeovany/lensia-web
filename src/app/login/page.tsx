import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-md px-6 py-16">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@correo.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard">Continuar</Link>
            </Button>
            <p className="text-muted-foreground text-sm">UI solamente. Sin autenticación real.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
